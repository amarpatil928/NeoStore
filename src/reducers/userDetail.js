

const initialState = {
    addresses: []
} 

export const addressReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'SET_ADDRESSES':
            return { ...state, addresses: payload };
    
        default:
            return state;
    }
}


export const selectedAddressReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SELECTED_ADDRESS':
            return {...state, ...payload};

        case 'REMOVE_SELECTED_ADDRESS':
            return {};

        default:
            return state;
    }
}