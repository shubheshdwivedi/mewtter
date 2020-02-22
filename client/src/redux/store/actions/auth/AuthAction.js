import AuthRequest from "../../../../connect/requests/auth/AuthRequest";
import {createAsyncAction, createAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    authReset: createAction('AUTH_RESET'),
    authenticate: createAsyncAction('AUTH')
});

const authRequest = AuthRequest;
const authAction = (data, type) => createApiAction(data, actions.authenticate, authRequest, type , actions.authReset);

export {constants};
export default authAction;
