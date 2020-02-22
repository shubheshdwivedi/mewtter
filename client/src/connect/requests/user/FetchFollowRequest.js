import createRequest from "../CreateRequest";

const FetchFollowRequest = (id) => {
    return createRequest('FetchFollowRequest', null, 'get', '/user/follow/'+id);
};
export default FetchFollowRequest;