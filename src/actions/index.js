export const increment = (productsCount) => {
    return {
        type: 'INCREMENT',
        payload: productsCount
    }
}


export const setProductCount = (productsCount) => {
    return {
        type: 'SET_PRODUCT_COUNT',
        payload: productsCount
    }
}

export const decrement = (productsCount) => {
    return {
        type: 'DECREMENT',
        payload: productsCount
    }
}


export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products,
    };
};


export const selectedProduct = (product) => {
    return {
        type: 'SELECTED_PRODUCT',
        payload: product,
    };
};


export const removeSelectedProduct = () => {
    return {
        type: 'REMOVE_SELECTED_PRODUCT'
    };
};


export const searchProductList = (searchItem) => {
    return {
        type: 'SEARCH_PRODUCT_LIST',
        payload: searchItem,
    };
};


export const setAddresses = (addresses) => {
    return {
        type: 'SET_ADDRESSES',
        payload: addresses,
    };
};

export const editUserAddress = (address) => {
    return {
        type: 'SELECTED_ADDRESS',
        payload: address,
    };
};


export const removeSelectedAddress = () => {
    return {
        type: 'REMOVE_SELECTED_ADDRESS'
    };
};


