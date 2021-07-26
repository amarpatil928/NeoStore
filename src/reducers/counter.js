
export const counterReducer = (state = 1, { type, payload}) => {
    switch (type) {
        case 'INCREMENT':
            return state + payload;

        case 'SET_PRODUCT_COUNT':
            return payload;

        case 'DECREMENT':
            return state - payload;
            
        default:
            return state;
    }
}