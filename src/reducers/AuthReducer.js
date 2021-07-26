import axios from "./../commonComponent/axios";
import { AuthActionType } from "../actions/AuthAction";

const authState = {
    isLoggedIn: false,
    user: {
        "_id": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "mobile": null,
        "gender": "",
        "address": [],
        "createdAt": "",
        "updatedAt": "",
        "__v": 0,
        "profilePicUrl": null,
        "id": "",
        "token": ""
    }
};


const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
        const authobj = JSON.parse(auth);
        const { token } = authobj.user;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return authobj;

    } catch (error) {
        return authState;
    }
};

const newAuth = getAuthState();

const authreducer = (state = newAuth, action) => {

    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS:
            const newAuthState = {
                isLoggedIn: true,
                user: action.payload,
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`
            localStorage.setItem("auth", JSON.stringify(newAuthState));
            return newAuthState;

        case AuthActionType.REGISTER_FAIL:
            return state;

        case AuthActionType.LOGIN_SUCCESS:
            const loginAuthState = {
                isLoggedIn: true,
                user: action.payload,
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;

        case AuthActionType.LOGIN_FAIL:
            return state;

        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;

        case AuthActionType.LOGOUT_FAIL:
            localStorage.removeItem("auth");
            return authState;

        default:
            return state;
    }

}

export default authreducer;
