import api from "../api";

const createRequest = (className, data, method, endpoint, type='') => {
    if(type)
        endpoint = (type==='login') ? '/auth/login' : '/auth/register';
    return class className {
        constructor() {
            this.data = data;
            this.method = method;
            this.endpoint = endpoint;
        }

        fire() {
            return api[this.method](this.endpoint, this.data);
        }
    }
};
export default createRequest;