export const getAllProductsReducer = (state = { products: [] , loading: false, error: null }, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null
            };
        case 'GET_PRODUCTS_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload // Ensure the payload is now a serializable object
            };
        default:
            return state;
    }
};
const initialState = {
    imgProducts: [], // Make sure this matches the expected structure in your component
    loading: false,
    error: null
};

export const getAllImgProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_IMGPRODUCTS_REQUEST':
            return { ...state, loading: true };
        case 'GET_IMGPRODUCTS_SUCCESS':
            return { ...state, loading: false, imgProducts: action.payload };
        case 'GET_IMGPRODUCTS_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
const initialState1 = {
  products: [],
  loading: false,
  error: null,
};

export const updateProductReducer = (state = initialState1, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_REQUEST':
      return { ...state, loading: true };

   case 'UPDATE_PRODUCT_SUCCESS':
  console.log('Updated State:', {
    ...state,
    products: state.products.map((product) =>
      product.REFINV_0 === action.payload.updatedProduct.REFINV_0
        ? { ...product, ETATINV: action.payload.updatedProduct.ETATINV }
        : product
    ),
  });
  return {
    ...state,
    loading: false,
    products: state.products.map((product) =>
      product.REFINV_0 === action.payload.updatedProduct.REFINV_0
        ? { ...product, ETATINV: action.payload.updatedProduct.ETATINV }
        : product
    ),
  };

    case 'UPDATE_PRODUCT_FAILED':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

