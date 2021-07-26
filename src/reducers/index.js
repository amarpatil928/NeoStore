import { counterReducer } from './counter';
import loggedReducer from './isLogged';
import { productReducer, selectedProductReducer, searchProductReducer } from './productReducer';
import { combineReducers } from 'redux';
import authreducer from './AuthReducer';
import { selectedAddressReducer, addressReducer } from './userDetail';

const allReducers = combineReducers({
    counter: counterReducer, 
    isLogged: loggedReducer,
    allProducts: productReducer,
    product: selectedProductReducer,
    searchList: searchProductReducer,
    authentication: authreducer,
    addresses: addressReducer,
    editAddress:  selectedAddressReducer,
})

export default allReducers;