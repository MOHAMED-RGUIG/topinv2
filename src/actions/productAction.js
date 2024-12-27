import axios from 'axios';
import Papa from 'papaparse';

//
export const getAllProducts = () => async dispatch => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });

    try {
        const response = await axios.get('https://topinvapi2.onrender.com/api/products/getallproducts'); // Update with your CSV file path
       
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: error.message });
    }
};



export const updateProduct = (REFINV_0, ETATINV) => async (dispatch) => {
    dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  
    try {
      const response = await axios.put(
        `https://topinvapi2.onrender.com/api/products/updateproducts/${REFINV_0}`,
        { ETATINV } // Envoyer ETATINV dans le corps
      );
  
      dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'UPDATE_PRODUCT_FAILED', payload: error.message });
    }
  };


export const getAllImgProducts = () => async dispatch => {
    dispatch({ type: 'GET_IMGPRODUCTS_REQUEST' });

    try {
        const response = await axios.get('../product_2024-06-03_164500.csv'); // Update with your CSV file path
        const parsedData = Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
        });
        dispatch({ type: 'GET_IMGPRODUCTS_SUCCESS', payload: parsedData.data });
    } catch (error) {
        dispatch({ type: 'GET_IMGPRODUCTS_FAILED', payload: error.message });
    }
};
