import FetchFollowRequest from "../../../../connect/requests/user/FetchFollowRequest";
import {createAsyncAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    follow: createAsyncAction('FOLLOW')
});

const fetchFollowRequest = FetchFollowRequest;
const fetchFollowAction = (data) => createApiAction(data, actions.follow, fetchFollowRequest);

export {constants};
export default fetchFollowAction;
