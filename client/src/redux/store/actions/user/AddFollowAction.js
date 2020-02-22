import AddFollowRequest from "../../../../connect/requests/user/AddFollowRequest";
import {createAsyncAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    addFollow: createAsyncAction('ADD_FOLLOW')
});

const addFollowRequest = AddFollowRequest;
const addFollowAction = (data) => createApiAction(data, actions.addFollow, addFollowRequest);

export {constants};
export default addFollowAction;
