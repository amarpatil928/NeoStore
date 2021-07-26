const initialState = {
    products: []
} 

export const productReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'SET_PRODUCTS':
            return { ...state, products: payload };
    
        default:
            return state;
    }
}


export const selectedProductReducer = (state={}, {type, payload}) => {
    switch (type) {
        case 'SELECTED_PRODUCT':
            return {...state, ...payload};

        case 'REMOVE_SELECTED_PRODUCT':
            return {};
    
        default:
            return state;
    }
}


export const searchProductReducer = (state = '', {type, payload}) => {
    switch (type) {
        case 'SEARCH_PRODUCT_LIST':
            return  payload;
    
        default:
            return state;
    }
}