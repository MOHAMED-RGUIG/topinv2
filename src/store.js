import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { getAllProductsReducer,getAllImgProductsReducer ,updateProductReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {getAllvalidInvReducer,getInvReducer,validInvReducer,getAllvalidInvByCodeReducer} from './reducers/validInvReducer'
import { loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { listInventaireReducer,getUserOrdersReducer, getAllOrdersReducer } from './reducers/listInventaireReducer';

//import { placeCartReducer } from './reducers/cartReducer';


const middleware = [thunk];
const rootReducer = combineReducers({
  products: getAllProductsReducer, // Use meaningful key like 'allProducts'
  cartReducer: cartReducer,
  //registerUserReducer:registerUserReducer,
  loginUserReducer:loginUserReducer, 
  listInventaireReducer:listInventaireReducer,
  getUserOrdersReducer:getUserOrdersReducer,
  //getAllOrdersReducer:getAllOrdersReducer,
  getAllvalidInvReducer:getAllvalidInvReducer,
  getInvReducer:getInvReducer,
  imgProducts: getAllImgProductsReducer,
  validInvReducer:validInvReducer,
  getAllvalidInvByCodeReducer:getAllvalidInvByCodeReducer,
  updateProductReducer:updateProductReducer
  //placeCartReducer:placeCartReducer
  // Use 
  // Use
  // other reducers...
});
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) :null;


const initialState = {
  cartReducer : {
    cartItems: cartItems
  },
  loginUserReducer : {
    currentUser: currentUser
  }
  
}


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
    ).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});

export default store;




