import PostTweetRequest from "../../../../connect/requests/tweets/PostTweetRequest";
import {createAsyncAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    postTweet: createAsyncAction('POST_TWEET')
});

const postTweetRequest = PostTweetRequest;
const postTweetAction = (data) => createApiAction(data, actions.postTweet, postTweetRequest);

export {constants};
export default postTweetAction;
