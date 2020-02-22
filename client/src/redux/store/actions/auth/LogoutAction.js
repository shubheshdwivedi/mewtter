import {createAction, module} from "redux-create-actions";

const {
    actions,
    constants
} = module('', {
    authLogout: createAction('LOGOUT'),
});
const logoutAction = actions.authLogout;
export {constants};
export default logoutAction;
