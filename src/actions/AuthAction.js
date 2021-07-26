
const AuthActionType = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAIL: "LOGOUT_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
}


const RegisterAuthAction = (type, userState) => {
    return (dispatch) => {

        switch (type) {
            case AuthActionType.REGISTER_SUCCESS:
                dispatch({type: type, payload: userState});
                break;

            case AuthActionType.REGISTER_FAIL:
                dispatch({type: type, payload: userState});
                break;
        
            default:
                dispatch({type: type, payload: userState});
                break;
        }
       
    }
}


const LogInAuthAction = (type, loginState) => {
    return (dispatch) => {

        switch (type) {
            case AuthActionType.LOGIN_SUCCESS:
                dispatch({type: type, payload: loginState});
                break;

            case AuthActionType.LOGIN_FAIL:
                dispatch({type: type, payload: loginState});
                break;
        
            default:
                dispatch({type: type, payload: loginState});
                break;
        }
       
    }
}



const LogOutAuthAction = (type) => {
    return (dispatch) => {

        switch (type) {
            case AuthActionType.LOGOUT_SUCCESS:
                dispatch({type: type, payload: {} });
                break;
        
            default:
                dispatch({type: AuthActionType.LOGOUT_FAIL, payload: {} });
                break;
        }
       
    }
}


export { RegisterAuthAction, LogOutAuthAction, LogInAuthAction, AuthActionType };