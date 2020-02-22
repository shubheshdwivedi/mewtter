import Api from "./Api";

let instance = null;

const getInstance = () => {
    if (!instance) {
        instance = new Api();
    }
    return instance;
};

const api = getInstance();
export default api;