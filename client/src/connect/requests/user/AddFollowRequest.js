import createRequest from "../CreateRequest";

const AddFollowRequest = (data) => {
    return createRequest('AddFollowRequest', data, 'post', '/user/follow/');
};
export default AddFollowRequest;