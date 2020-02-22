import createRequest from "../CreateRequest";

const PostTweetRequest = (data) => {
    return createRequest('PostTweetRequest', data, 'post', '/tweet');
};
export default PostTweetRequest;