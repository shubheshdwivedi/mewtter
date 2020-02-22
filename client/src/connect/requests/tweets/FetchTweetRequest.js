import createRequest from "../CreateRequest";

const FetchTweetRequest = (id) => {
    return createRequest('FetchTweetRequest', null, 'get', '/tweet/'+id);
};
export default FetchTweetRequest;