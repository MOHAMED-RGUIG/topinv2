import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';

export default function Inventoryheaders({ inventory }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addtocart() {
    const selectedQuantity = parseInt(quantity, 10) || 1;
    dispatch(addToCart(inventory, selectedQuantity, isChecked));
    toast.success('Le produit est ajouté à la carte!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false
    });
  }
  const [imageSrc, setImageSrc] = useState('./greenheart.png');
  const [Btnstyle, setBtnstyle] = useState('category-btn2');
  const [BtnText, setBtnText] = useState('Status');
  const handleClick = () => {
    setImageSrc(prevSrc => prevSrc === './greenheart.png' ? './heart1.png' : './greenheart.png');
    setBtnstyle (prevSrc => prevSrc === 'category-btn2' ? 'category-btn3' : 'category-btn3');
    setBtnText (prevSrc => prevSrc === 'Ajouter' ? 'Ajoutée' : 'Ajoutée');

    addtocart();
  };

const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
};
  //const calculatedPrice = isChecked ? 0 : inventory.PRI_0 * quantity;
 // const isMachineCategory = ['MACHINES','MACHINE A MODO MIO','FONTAINE','MACHINE BOUTIQUE','GUZZINI','MACHINE ESPRESSO','MACHINE FIRMA','MOULIN','FONTAINE'].includes(inventory.Designation_Famille_Stat1);
   // const isPub = ['ART. PUBLICITE'].includes(inventory.Designation_Famille_Stat1)

  return (
   <div className='mt-1 col-12 col-md-12 cart-inventory'>         
    <div style={{ backgroundColor: '#183F7F', borderTop: '0px solid #ffffff', width:'100%', padding:'0px !important' }} className='shop-card bg-body d-flex align-items-center'>
      {/*        <img src={inventory.Image} alt='inventory' className='img' style={{ height: '70px', width: '50px', overflow:'hidden', backgroundColor:'#f3f3f3 !important' }} />
 */}
      <div style={{ width: '20%' }} onClick={handleShow}>
      </div>
  
      <div className="inventory-tag1 d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
        <div >        <h3 className='pt-2 text-start block' style={{ fontSize:'12px',color:'#183F7F ',textTransform:'uppercase', width:'100px' }}>{inventory.Date}</h3>
</div>
<div >        <h3 className='pt-2 text-start block' style={{ fontSize:'12px',color:'#183F7F ',textTransform:'uppercase', width:'100px' }}>{inventory.Reference}</h3>
</div>
       
<div >        <h3 className='pt-2 px-2 text-start block' style={{ fontSize:'12px',color:'#183F7F ',textTransform:'uppercase', width:'100px' }}>{inventory.Status}</h3>
</div>
  
        <div className='inventory-price' style={{ width: '100px' ,color:'black',fontSize:'9px'}}>
      
        {/*<img 
      src={imageSrc} 
      alt='ADD' 
      style={{ height: '18px', cursor: 'pointer',width:'18px' }} 
      onClick={handleClick} 
    />*/ }

     
        </div>
      
      </div> 
  
    </div>    
  </div>
  
  );
}
