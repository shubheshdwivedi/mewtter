import {createReducer} from "redux-create-reducer";
import {constants as AuthConstants} from "../../../actions/auth/AuthAction";
import {constants as LogoutConstants} from "../../../actions/auth/LogoutAction";

const initState = {
    token: null,
    user: null,
    error: null
};

const AuthReducer = createReducer(initState, {
        [AuthConstants.AUTH_START](state, action) {
            return initState;
        },
        [AuthConstants.AUTH_SUCCESS](state, action) {
            const {user, token} = action.payload.data;
            localStorage.setItem('token', token);
            return {
                ...state,
                token: token,
                user: user,
                error: null
            }
        },
        [AuthConstants.AUTH_RESET]() {
            return initState;
        },
        [AuthConstants.AUTH_FAILURE](state, action) {
          return {
              ...state,
              error: action.payload.message
          }
        },
        [LogoutConstants.LOGOUT](state, action) {
            localStorage.clear();
            return {}
        }
    });


export default AuthReducer;