import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QrScanner from "react-qr-scanner";

function ListInventaire() {

    
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
  
  
    const [ETATINV, setETATINV] = useState('');
    const [DESINV, setDESINV] = useState('');
    const [DATEINV, setDATEINV] = useState('');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
  const [qrCodeData, setQrCodeData] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
    }
  };

  const handleError = (error) => {
    console.error("Erreur du QR code : ", error);
  };
    {/*
    const handleCheckout = () => {
    const DESINVInput = document.querySelector('input[placeholder="Libelé inventaire"]');
    const REFINVnput = document.querySelector('input[placeholder="Reference inventaire"]');
    const DATEINVInput = document.querySelector('input[type="date"]');
    // Check if any of the fields are empty
  
    const isDESINVValid = DESINVInput.value.trim() !== '';
    const isREFINVValid = REFINVnput.value.trim() !== '';
    const isDATEINVValid = DATEINVInput.value.trim() !== '';

    if(isDESINVValid){
        console.log('tru');
    }
    if ( isDESINVValid && isREFINVValid && isDATEINVValid) {
            // Proceed with your checkout logic
            // ...
        
              // Perform checkout logic
        const orderGroup = {
            items: cartItems.map(item => ({
                QTY: item.quantity,
                NETPRI: item.PRI_0,
                TOTLIN: item.price ,
                ITMDES: item.ITMDES1_0,
                ITMREF :item.ITMREF_0,
                GRAT: item.isChecked ? 1 : 0 // Assuming isChecked indicates if the item is free
            })),
            orderInfo: {
                ORDDAT: DATEINV,
                BPCORD: REFINV,
                BPCNAME:DESINV
            }
        };
        generateOrderPDF(orderGroup);
        } else
               // Show an alert and focus on the fiDESINVt empty field
         {
            alert('Please enter the "Raison Social".');
            console.log('Please enter')
        }
        
    
    };*/}

    const generateOrderPDF = (orderGroup) => {
         // Add Poppins font to jsPDF
  

        const doc = new jsPDF();
        const logoImg = new Image();
        logoImg.src = '../logo.jpg'; // Ensure the path is correct
    
        // Calculate total price and quantity
        const totalQuantity = orderGroup.items.reduce((total, item) => total + item.QTY, 0);
        const totalP = orderGroup.items.reduce((total, item) => total + item.NETPRI, 0);
        const totalPrice = orderGroup.items.reduce((total, item) => total + item.TOTLIN, 0);
    
        logoImg.onload = () => {
            doc.addImage(logoImg, 'JPG', 25, 15, 30, 20); // x, y, width, height
            doc.setFontSize(15);
            doc.setFont("poppins", "bold");
            doc.setTextColor('#003f7e');
            doc.text(`TOP CLASS ESPRESSO`, 120, 20);
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
        
            doc.text(`E :` + currentUser.EMAILUSR, 120, 35);
            doc.text(`P:   ` + currentUser.TELEP, 120, 40);
            doc.text(`DETAIL COMMANDE`, 15, 55);
    
            const columns = ["", ""];
            const rows = [
                ["Chargé de compte :", currentUser.NOMUSR],
                ["Date :", orderGroup.orderInfo.ORDDAT],
                ["Client Code :", orderGroup.orderInfo.BPCORD],
                ["Raisons Social :", orderGroup.orderInfo.BPCNAME]
            ];
    
            doc.autoTable({
                startY: 60,
                head: [columns],
                body: rows,
                theme: 'plain',
                styles: { cellPadding: 1, fontSize: 10 },
                columnStyles: {
                    0: { cellWidth: 40 },
                    1: { cellWidth: 100 }
                }
            });
            doc.setFontSize(25); // Set font size
            doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
            doc.setTextColor('#003f7e'); // Set text color to blue (RGB format)
            doc.text(`BON DE COMMANDE`, 65, 110);
    
            const tableColumns = ['Référence','Désignation','Quantité', 'Prix unitaire','Total HT'];
            const tableRows = orderGroup.items.map(item => [item.ITMREF,item.ITMDES, item.QTY, item.GRAT == 1 ? 'Gratuit' : `${item.NETPRI.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,`${item.TOTLIN.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
    
            doc.autoTable({
                startY: 120,
                head: [tableColumns],
                styles: { cellPadding: 1, fontSize: 10 },
                body: tableRows,
                foot: [[ '','', '',  `Total HT`, `${totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH`]],
                headStyles: { fillColor: '#063970' },  // Light grey background
                footStyles: { fillColor: '#063970' },
                didDrawPage: function (data) {
                    // Calculate the position for the custom text
                    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                    let textY = data.cuDESINVor.y + 35; // Add 10 units below the table
                    let textX = data.settings.margin.left + 30;
                    // Add custom text after the table foot
                    doc.setFontSize(15); 
                    doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
                    doc.setTextColor('#000000'); // Set text color to blue (RGB format)
                    doc.text("VISA", textX, textY);
                }
            });
    
            // Save the PDF as a base64 string
            const pdfData = doc.output('datauristring').split(',')[1];
            const uniqueId = new Date().toISOString();
            // Send the PDF to the server
            fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headeDESINV: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:['rguigmed107@gmail.com', 'mohamedrguig26@gmail.com', currentUser.EMAILUSR], // Replace with recipient email
                    subject: `Nouvelle commande ${uniqueId}`,
                    text: `Vous avez une nouvelle commande .Pour plus d'information merci d'ouvrir le pdf ci-dessous.`,
                    pdfData: pdfData,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            doc.save(`order_${orderGroup.orderInfo.ORDDAT}.pdf`);
            alert('Your order PDF is exported and sent via email!');
        };
    };
    
    
    return (
        <div className='container col-xl-12 col-md-12 col-12 cart-details'>
            <div className='justify-content-center mt-5 col-12 col-md-12'>
                <div className='col-md-12 col-12'>
   
                </div>
            </div>
            <div className='col-md-10 text-center col-10 mx-auto bg-white cart-client-infos'>
                <form>
                  
                <div className="text-start w-100 col-xl-10 col-10 col-md-10 pb-2 mx-auto">
                      {/*DATE INVENTAIRE */}
                <input
                        required
                        type='date'
                        placeholder='DATE'
                        className='form-control mx-auto'
                        value={DATEINV}
                        onChange={(e) => { setDATEINV(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    />
                      {/*REFERENCE INVENTAIRE 
                      
                      <input
                        required
                        type='text'
                        placeholder='Reference inventaire'
                        className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                        value={REFINV}
                        onChange={(e) => { setREFINV(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    /> 
                      */}
                    
                     {/*LIBELE INVENTAIRE */}
                    <input
                    required
                    type='text'
                    placeholder='Libelé inventaire'
                    className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                    value={DESINV}
                    onChange={(e) => { setDESINV(e.target.value) }}
                    style={{ width: '90%', fontSize: '13px' }}
                />
  <select
    required
    className='form-control col-xl-10 col-8 col-md-8 mx-auto mt-3'
    value={ETATINV}
    onChange={(e) => { setETATINV(e.target.value) }}
    style={{ width: '90%', fontSize: '13px' }}
>
    <option value="" disabled>Choisir l'état d'inventaire</option>
    <option value="En cours">En cours</option>
    <option value="Terminé">Terminé</option>
    <option value="Annulé">Annulé</option>
</select>

{/*    <input
                    required
                    type='text'
                    placeholder='Etat inventaire'
                    className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                    value={ETATINV}
                    onChange={(e) => { setETATINV(e.target.value) }}
                    style={{ width: '90%', fontSize: '13px' }}
                />*/}
                 
                </div>
                </form>
                <div className='flex-container col-12'>
                    <div className="menubar-nav d-flex justify-content-end col-10 mx-auto">
                        <Checkout DATEINV={DATEINV}  DESINV={DESINV} ETATINV={ETATINV}/>
                    </div>
                </div>
            </div>
            

        </div>
    );
}

export default ListInventaire;
