
export const getAllvalidInvReducer = (state = { validinv: [] , loading: false, error: null }, action) => {
    switch (action.type) {
        case 'GET_VALIDINV_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_VALIDINV_SUCCESS':
            return {
                ...state,
                loading: false,
                validinv: action.payload,
                error: null
            };
        case 'GET_VALIDINV_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload // Ensure the payload is now a serializable object
            };
        default:
            return state;
    }
};

export const getAllvalidInvByCodeReducer = (state = { validinvcode: [] , loading: false, error: null }, action) => {
    switch (action.type) {
        case 'GET_VALIDINVCODE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_VALIDINVCODE_SUCCESS':
            return {
                ...state,
                loading: false,
                validinvcode: action.payload,
                error: null
            };
        case 'GET_VALIDINVCODE_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload // Ensure the payload is now a serializable object
            };
        default:
            return state;
    }
};

export const getInvReducer = (state = { getinv: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case 'GET_GETINV_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_GETINV_SUCCESS':
            return {
                ...state,
                loading: false,
                getinv: action.payload,
                error: null,
            };
        case 'GET_GETINV_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const validInvReducer = (state={},action)=>{

    switch(action.type){
        case 'PLACE_VALIDINVINSERT_REQUEST': return{
            loading :true
        }
        case 'PLACE_VALIDINVINSERT_SUCCESS': return{
            loading :false,
            success:true
        }
        case 'PLACE_VALIDINVINSERT_FAILED': return{
            loading :false,
            error:action.payload
        }
        default : return state
    }
}