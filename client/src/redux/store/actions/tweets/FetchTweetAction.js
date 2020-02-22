import FetchTweetRequest from "../../../../connect/requests/tweets/FetchTweetRequest";
import {createAsyncAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    fetchTweets: createAsyncAction('FETCH_TWEET')
});

const fetchTweetRequest = FetchTweetRequest;
const fetchTweetAction = (data) => createApiAction(data, actions.fetchTweets, fetchTweetRequest);

export {constants};
export default fetchTweetAction;
