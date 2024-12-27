import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validInvInsert } from '../actions/validInvAction';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import Error from '../components/Error';
import Success from '../components/Success';
import emailjs from 'emailjs-com';

function CheckoutValidinv({ REFINV_0, ITMREF_0, localData }) {
    const validinvinsertstate = useSelector(state => state.validInvReducer);
    const { loading, error, success } = validinvinsertstate;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const dispatch = useDispatch();

    function tokenHandler() {
        if (REFINV_0 && ITMREF_0 && localData.length > 0) {
            const payload = {
                REFINV_0,
                ITMREF_0,
                rows: localData // Inclure toutes les lignes du tableau
            };
            dispatch(validInvInsert(payload));
            toast.success('Votre inventaire a été ajouté avec succès !', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false
            });
        } else {
            toast.error('Oops ! Merci de remplir le formulaire et d’ajouter des lignes !', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false
            });
        }
    }

    return (
        <div className='col-12 col-md-12 text-center justify-content-end'>
            {loading && (<Loading />)}
            {error && (<Error error='Merci de tenter une autre fois' />)}
            {success && (<Success success='Votre inventaire a été ajouté avec succès' />)}
            <button className='btn5 col-11 col-md-11 mt-2 p-2' onClick={tokenHandler}>
                Valider
            </button>
        </div>
    );
}

export default CheckoutValidinv;
