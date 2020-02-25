import axios from 'axios';

class Api {
    constructor() {
        this.BASE_URL = 'http://localhost:8000/api/';
        this.api = axios.create({
            baseURL: this.BASE_URL
        });
        this.setHeader();
    }

    get(endpoint, params) {
        return this.api.get(endpoint, {params});
    }

    post(endpoint, data) {

        return this.api.post(endpoint, data);
    }

    delete(endpoint, data) {
        return this.api.delete(endpoint, {data});
    }

    put(endpoint, data) {
        return this.api.put(endpoint, data);
    }

    async setHeader(t) {
        const token = (localStorage.getItem('token')) ? localStorage.getItem('token') : t ;
        if (token !== null)
            this.api.defaults.headers.common['x-auth-token'] = token;
    }
}

export default Api;
