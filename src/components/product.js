import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';
import { FaEdit ,FaFilePdf, FaTrashCan } from 'react-icons/fa';
import { FaRegFileExcel  } from "react-icons/fa"; 
import { FaRegTrashAlt  } from "react-icons/fa";
import { updateProduct } from '../actions/productAction';
export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [etatInv, setEtatInv] = useState(product.ETATINV);
  // Fonction pour ouvrir/fermer le popup
  const togglePopup = () => setShowPopup(!showPopup);

  const handleUpdate = () => {
    const newStatus = etatInv === 'Réalisé' ? 'Ouvert' : 'Réalisé'; // Toggle status
console.log('REFINV_0:', product.REFINV_0, 'newStatus:', newStatus);
    dispatch(updateProduct(product.REFINV_0, newStatus))
      .then(() => {
        setEtatInv(newStatus); // Mettre à jour l'état local
        togglePopup();
      })
      .catch((error) => {
        console.error('Update failed:', error);
      });
  };
  const [imageSrc, setImageSrc] = useState("./greenheart.png");
  const [btnStyle, setBtnStyle] = useState("btn btn-sm btn-outline-success");
  const [btnText, setBtnText] = useState("Exporter");

  const handleClick = () => {
    setImageSrc((prev) => (prev === "./greenheart.png" ? "./heart1.png" : "./greenheart.png"));
    setBtnStyle((prev) =>
      prev === "btn btn-sm btn-outline-success" ? "btn btn-sm btn-outline-secondary" : "btn btn-sm btn-outline-secondary"
    );
    setBtnText((prev) => (prev === "Ajouter" ? "Ajoutée" : "Ajoutée"));

    const selectedQuantity = parseInt(quantity, 10) || 1;
    dispatch(addToCart(product, selectedQuantity, isChecked));

    toast.success("Le produit est ajouté à la carte!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };
  return (
        <div className="card">
          <div className="card-body">
            <div className="d-flex">
              {/* Détails du produit */}
              <div className="d-flex flex-column col-3">
                <p className="mb-0 small" style={{ fontSize: '10px' }}>
                  {new Date(product.DATEINV_0).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="d-flex flex-column text-center col-6">
                <p className="mb-0 small" style={{ fontSize: '10px' }}>
                  {product.DESINV_0}
                </p>
              </div>

              <div className="d-flex flex-column text-center col-2">
                  <span
                    className={`badge ${
                      etatInv === 'Réalisé' ? 'bg-success' : 'bg-warning text-dark'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {etatInv}
                  </span>
                </div>
              {/* Boutons */}
              <div className="d-flex gap-2 col-1">
                <button
                  className="btn7 btn-sm btn-outline-primary d-flex align-items-center icon-list-inv"
                  onClick={togglePopup} // Afficher le popup
                >
                  <FaRegFileExcel size={12} className="me-1" />
                </button>
              </div>
              <div className="d-flex gap-2 col-1">
                <button
                  className="btn7 btn-sm btn-outline-primary d-flex align-items-center icon-list-inv"
                  onClick={togglePopup} // Afficher le popup
                >
                 <FaRegTrashAlt  size={12} className="me-1" />
                </button>
              </div>
            </div>
        </div>

    {/* Popup de confirmation */}
    {showPopup && (
      <div
        className="modal d-block mt-5 col-12 moadal-statuts"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog ">
          <div className="modal-content col-10 mx-auto mt-5" style={{width:'70%'}}>
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="btn-close" onClick={togglePopup}></button>
            </div>
            <div className="modal-body">
              <p>Vous voulez changer l'état du produit ?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-primary-topclass btn-primary"
                onClick={handleUpdate} // Valider l'action
              >
                Cloturé
              </button>
              <button
                type="button"
                className="btn-cancel-topclass btn-secondary"
                onClick={togglePopup} // Fermer le popup
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
