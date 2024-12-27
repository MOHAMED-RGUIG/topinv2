import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import CheckoutValidinv from '../components/CheckoutValidinv';
import { debounce } from 'lodash';
import { getFilteredValidInv,getFilteredValidInvByCode,getInv}  from '../actions/validInvAction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import   QrReader  from "react-qr-barcode-scanner";
import { Html5Qrcode } from "html5-qrcode";
//import { Html5QrcodeScanner } from "html5-qrcode";
function Validinv() {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const validInvstate = useSelector(state => state.getAllvalidInvReducer);
    const validInvCodestate = useSelector(state => state.getAllvalidInvByCodeReducer);
    const getInvState = useSelector((state) => state.getInvReducer);
    const [localData, setLocalData] = useState([]);
    const { getinv } = getInvState;
    const { validinv, error, loading } = validInvstate; 
    const {validinvcode} = validInvCodestate;

    const [isScannerActive, setIsScannerActive] = useState(false);
 const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
const [scanner, setScanner] = useState(null);
useEffect(() => {
        let html5QrCode;

        if (isScannerActive) {
            html5QrCode = new Html5Qrcode("qr-reader");
            const config = {
                fps: 10,
                qrbox: 250,
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true,
                },
            };

            const cameraConfig = { facingMode: "environment" }; // Active la caméra arrière

            html5QrCode.start(
                cameraConfig,
                config,
                (decodedText) => {
                    setScanResult(decodedText);
                    setIsScannerActive(false); // Arrête le scanner après un scan réussi
                },
                (error) => {
                    console.warn("Erreur de scan : ", error);
                }
            ).then(() => setScanner(html5QrCode))
              .catch((err) => console.error("Erreur lors du démarrage du scanner", err));
        }

        return () => {
            if (html5QrCode) {
                html5QrCode.stop().then(() => html5QrCode.clear());
            }
        };
    }, [isScannerActive]);
    const debouncedDispatch = debounce((value) => {
      if (value.trim().length >= 3) {
          dispatch(getFilteredValidInv(value));}
  }, 500);
  const handleInputChange = (e) => {
      const value = e.target.value;
      setITMREF_0(value);
      debouncedDispatch(value);
  };
  const debouncedCodeDispatch = debounce((value) => {
    if (value.trim().length >= 3) {
        dispatch(getFilteredValidInvByCode(value));}
}, 500);
const handlechangeresult = (e) => {
        const value = e.target.value;
        setScanResult(value);
        setEANCOD_0(value);
    };
 //la derniere   
const handleInputCodeChange = (e) => {
    const value = e.target.value;
    setEANCOD_0(value);

    // Recherche l'article correspondant dans localData
    const matchedItem = localData.find(item => item.EANCOD_0 === value);

    // Si un article est trouvé, met à jour ITMREF_0
    if (matchedItem) {
        setITMREF_0(matchedItem.ITMREF_0);
    } else {
        setITMREF_0(''); // Réinitialise si aucun article ne correspond
    }

    debouncedCodeDispatch(value);
};
  const addNewRow = (e) => {
    e.preventDefault();
    const newRow = {
      STOCOU_0: `new-${Date.now()}`, // ID unique pour la nouvelle ligne
      LOT_0: '', // Valeur initiale pour LOT
      STOFCY_0: '', // Valeur initiale pour Emplacement
      Qt: '' // Valeur initiale pour Quantité
    };
    // Ajouter la nouvelle ligne en haut
    setLocalData([newRow, ...localData]);
  };
   const deleteRow = (id) => {
    const updatedData = localData.filter(row => row.STOCOU_0 !== id);
    setLocalData(updatedData);
  };
    useEffect(() => {
      if (validinv) {
        // Copier les données pour un état local modifiable
        setLocalData(validinv.map((item) => ({ ...item, Qt: item.Qt || '' })));
      };     
    }, [validinv]);
    useEffect(() => {
      if (validinvcode) {
        // Copier les données pour un état local modifiable
        setLocalData(validinvcode.map((item) => ({ ...item, Qt: item.Qt || '' })));
      };     
    }, [validinvcode]);
    useEffect(() => {
      dispatch(getInv());
  }, [dispatch]);
    const handleQtChange = (id, value) => {
      if (!isNaN(value) && value >= 0) {
        const updatedData = localData.map((item) =>
          item.STOCOU_0 === id ? { ...item, Qt: Number(value) } : item
        );
        setLocalData(updatedData);
      } else {
        console.log("Valeur invalide pour Qt.");}};
    // Gestion du popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [additionalQt, setAdditionalQt] = useState(""); 
    const openPopup = (id) => {
      setSelectedItemId(id);
      setIsPopupOpen(true);};  

    const closePopup = () => {
      setIsPopupOpen(false);
      setAdditionalQt("");};  

    const handleAddQt = () => {
      const updatedData = localData.map((item) =>
        item.STOCOU_0 === selectedItemId
          ? { ...item, Qt: item.Qt + Number(additionalQt) }
          : item
      );
      setLocalData(updatedData);
      closePopup();
    };
    useEffect(() => {
    if (scanResult) {
        handleInputCodeChange({ target: { value: scanResult } });
    }
}, [scanResult]);
    
    const [REFINV_0, setREFINV_0] = useState('');
    
  
    const [DESINV_0, setDESINV_0] = useState('');
    const [ITMREF_0, setITMREF_0] = useState('');
    const [EANCOD_0, setEANCOD_0] = useState('');
    const [DESINV, setDESINV] = useState('');
  
 
     useEffect(() => {
    if (EANCOD_0.trim() !== "") {
      const matchedItem = localData.find((item) => item.EANCOD_0 === EANCOD_0);
      if (matchedItem) {
        setITMREF_0(matchedItem.ITMREF_0); // Remplit avec itmref trouvé
      } else {
        setITMREF_0(""); // Réinitialise si aucune correspondance
      }
    } else {
      setITMREF_0(""); // Réinitialise si Code-barre est vide
    }
  }, [EANCOD_0, localData]);
    
    return (
        <div className='container col-xl-12 col-md-12 col-12 mx-auto cart-details'>
            <div className='justify-content-center mt-5 col-12 col-md-12'>
                <div className='col-md-12 col-12'>
   
                </div>
            </div>
            <form>
            <div className='col-md-12 col-xl-12 col-10 col-xs-10 mx-auto bg-white cart-client-infos'>
                
                  
                <div className="text-start w-100 col-xl-10 col-8 col-md-8 pb-2">                     
<div className="d-flex align-items-center mt-2">
    {/* Select Inventaire */}
    
<input
        
        type="text"
        placeholder="Code-barre"
        className="form-control col-xl-10 col-8 col-md-8 mx-auto"
        value={EANCOD_0}
        onChange={handleInputCodeChange}  // Met à jour le résultat du scan dans l'input
        style={{ width: '90%', fontSize: '13px' }}
      />

    {/* Bouton Scanner */}
    <button
        type="button" // Empêche le comportement par défaut
        onClick={(e) => {
            e.preventDefault(); // Empêche toute action par défaut
            setIsScannerActive(!isScannerActive);
        }}
         className="btn-Scan btn-primary"
    >
        <i className="fas fa-qrcode"></i> {/* Icône de scan */}
    </button>
</div>

{/* Scanner QR si actif */}
{isScannerActive && <div id="qr-reader" style={{ width: "100%" }} />}

            
    {/* Select Inventaire */}
    <select
        className="form-control mt-2 col-xl-10 col-10 col-md-10"
        value={REFINV_0}
        onChange={(e) => setREFINV_0(e.target.value)}
        style={{ width: '90%', fontSize: '13px' }}
    >
        <option value="" disabled>
            Sélectionnez un inventaire
        </option>
        {getinv && getinv.length > 0 ? (
            getinv.map((inv, index) => (
                <option key={index} value={inv.REFINV_0}>
                    {inv.DESINV_0}
                </option>
            ))
        ) : (
            <option disabled>Aucun inventaire disponible</option>
        )}
    </select>

                          <input
                
                type="text"
                placeholder="Code-barre"
                className="form-control col-xl-10 col-10 col-md-10 mx-auto"
                value={EANCOD_0} // Résultat combiné (manuel + scan)
                onChange={(e) => handleInputCodeChange}
                style={{ display:'none',width: "90%", fontSize: "13px", marginTop: "10px" }}
            />

<input
                
                type="text"
                placeholder="Résultat QR Code"
                className="form-control col-xl-10 col-8 col-md-8 mx-auto"
                value={scanResult}
                onChange={handlechangeresult}
                style={{ display:'none',width: "90%", fontSize: "13px", marginTop: "10px" }}
            />
    
         
    <input
                
                type='text'
                placeholder='Code article'
                className='form-control col-xl-10 col-10 col-md-10 input-itmref'
                value={ITMREF_0}
                onChange={handleInputChange}
readOnly={EANCOD_0.trim() !== ''}
            />   
    
    

                  
     <div className="mb-4" style={{ display:'none'}}>
    <h5 className="text-lg font-bold mb-2 mt-4 w-50 mx-auto">Référence</h5>
    <ul className="list-disc list-inside">
      {[...new Set(localData.map((item) => item.ITMREF_0))].map((itmref, index) => (
        <li key={index} className="text-xs mx-auto w-50" style={{ listStyle: 'none'}}>{itmref}</li>
      ))}
    </ul>
  
  </div>
  


                </div>
 
                 </div>
                

                               
                
<div className='container'>
{localData.map((item) => (
<div className='row lot-details' key={item.STOCOU_0}>
  <div>
    <label>Lot</label>
    <input
          type="text"
          value={item.LOT_0}
          onChange={(e) => {
            const updatedData = localData.map((row) =>
              row.STOCOU_0 === item.STOCOU_0 ? { ...row, LOT_0: e.target.value } : row
            );
            setLocalData(updatedData);
          }}
          className="form-control mx-auto border p-1"
          style={{ width: "90%", fontSize: "13px" }}
        /></div>
  <div>
  <label>Emplacement</label>
  <input
          type="text"
          value={item.STOFCY_0}
          onChange={(e) => {
            const updatedData = localData.map((row) =>
              row.STOCOU_0 === item.STOCOU_0 ? { ...row, STOFCY_0: e.target.value } : row
            );
            setLocalData(updatedData);
          }}
          className="form-control mx-auto border p-1"
          style={{ width: "90%", fontSize: "13px" }}
        />
  </div>
  <label>Quantité</label>
  <div style={{ display: "flex", alignItems: "center", width: "100%", marginLeft: "15px" }}>
  <input
    type="number"
    value={item.Qt}
    onChange={(e) => handleQtChange(item.STOCOU_0, e.target.value)}
    className="form-control mx-auto border p-1"
    style={{ width: "90%", fontSize: "13px" }}
  />
  <button
    type='button'
    onClick={() => openPopup(item.STOCOU_0)}
    className="btn-plus bg-red-500 text-white"
    style={{ width: "10%", marginLeft: "8px", padding: "0" }}
  >
    +
  </button>
</div>




<div>


</div>

  </div>
  ))} 
</div>
      {/* Popup */}
      {isPopupOpen && (
  <div
    className="position-fixed top-0 left-0 w-60 h-100 popup bg-opacity-50 d-flex justify-content-center align-items-center"
    
>
    <div className="p-4 rounded popup-details border w-100">
      <h3 className="text-lg font-bold mb-2">Ajouter une quantité</h3>
      <input
        type="number"
        placeholder="Entrez une quantité"
        className="form-control mb-4"
        value={additionalQt}
        onChange={(e) => setAdditionalQt(e.target.value)}
      />
      <div className="d-flex justify-content-end">
        <button
          onClick={closePopup}
          className="btn5 btn-secondary me-2">
          Annuler
        </button>
        <button
          onClick={handleAddQt}
          className="btn5 btn-primary">
            Ajouter
        </button>
      </div>
    </div>
  </div>
)}
                <div className="text-right mb-2">
  <button
    onClick={(e) => addNewRow(e)}
    className="btn btn-new bg-blue-500 text-white px-3 py-1"
  >
    Ajouter une ligne
  </button>
</div>
                
                </form>
           

            <footer className="menubar-area fot footer-fixed mt-2 cart-footer" style={{ backgroundColor: 'rgb(255,255,255)' }}>
                <div className='flex-container col-12'>
                  
                    <div className="menubar-nav d-flex justify-content-end col-10 mx-auto">
                    <CheckoutValidinv
    REFINV_0={REFINV_0}
    ITMREF_0={ITMREF_0}
    localData={localData}
/>
                    </div>
                </div>
            </footer>  

        </div>
    );
}

export default Validinv;
