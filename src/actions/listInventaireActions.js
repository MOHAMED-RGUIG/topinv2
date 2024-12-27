import axios from 'axios';

export const listInventaire = (DATEINV, DESINV,ETATINV) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_LISTINVENTAIRE_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    try {
        const response = await axios.post('https://topinvapi2.onrender.com/api/inventaire/listInventaire', {currentUser, DATEINV, DESINV,ETATINV });
        console.log(response);
        dispatch({ type: 'PLACE_LISTINVENTAIRE_SUCCESS' });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network error';
        dispatch({ type: 'PLACE_LISTINVENTAIRE_FAILED', payload: errorMessage });
    }
};


export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;

    dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

    try {
        const response = await axios.post('https://topinvapi2.onrender.com/api/orders/getuserorders', { currentUser });
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'GET_USER_ORDERS_FAILED', 
            payload: { message: error.message, code: error.code } // Serializing error
        });
    }
};





/*export const getAllOrders = () => async dispatch => {


    dispatch({ type: 'GET_ORDERS_REQUEST' });

    try {
        const response = await axios.get('/api/orders/getallorders');
        dispatch({ type: 'GET_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'GET_ORDERS_FAILED', 
            payload: { message: error.message, code: error.code } // Serializing error
        });
    }
};*/
