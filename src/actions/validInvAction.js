import axios from 'axios';


export const getFilteredValidInv = (itmref) => async (dispatch) => {
    dispatch({ type: 'GET_VALIDINV_REQUEST' });

    try {
        const response = await axios.get(`https://topinvapi2.onrender.com/api/validinv/getAllValidInv`, {
            params: { itmref }, // Envoyer le filtre en tant que paramètre
        });
        dispatch({ type: 'GET_VALIDINV_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'GET_VALIDINV_FAILED',
            payload: { message: error.message, code: error.code },
        });
    }
};
export const getFilteredValidInvByCode = (eancod) => async (dispatch) => {
    dispatch({ type: 'GET_VALIDINVCODE_REQUEST' });

    try {
        const response = await axios.get(`https://topinvapi2.onrender.com/api/validinv/getAllValidInvByCode`, {
            params: { eancod }, // Envoyer le filtre en tant que paramètre
        });
        dispatch({ type: 'GET_VALIDINVCODE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'GET_VALIDINVCODE_FAILED',
            payload: { message: error.message, code: error.code },
        });
    }
};

export const getInv = () => async (dispatch) => {
    dispatch({ type: 'GET_GETINV_REQUEST' });

    try {
        const response = await axios.get(`https://topinvapi2.onrender.com/api/validinv/getInv`, {
           
        });
        dispatch({ type: 'GET_GETINV_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'GET_GETINV_FAILED',
            payload: { message: error.message, code: error.code },
        });
    }
};

/*
export const validInv = (DATEINV, DESINV) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_VALIDINV_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    try {
        const response = await axios.post('http://localhost:5000/api/validinv/validInv', {currentUser, DATEINV, DESINV });
        console.log(response);
        dispatch({ type: 'PLACE_VALIDINV_SUCCESS' });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network error';
        dispatch({ type: 'PLACE_VALIDINV_FAILED', payload: errorMessage });
    }
};*/

export const validInvInsert = (payload) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_VALIDINVINSERT_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;

    try {
        const response = await axios.post('https://topinvapi2.onrender.com/api/validinv/validInvInsert', {
            currentUser,
            ...payload // Inclure REFINV_0, ITMREF_0 et les lignes du tableau
        });
        console.log(response);
        dispatch({ type: 'PLACE_VALIDINVINSERT_SUCCESS' });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network error';
        dispatch({ type: 'PLACE_VALIDINVINSERT_FAILED', payload: errorMessage });
    }
};
