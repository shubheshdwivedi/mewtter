import createRequest from "../CreateRequest";

const AuthRequest = (data, type) => {
    const endpoint = (type==='login') ? '/auth/login' : '/auth/register';
    return createRequest('AuthRequest', data, 'post', endpoint, type);
};
export default AuthRequest;