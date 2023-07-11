import axios from "axios";

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

const _axios = axios.create();
const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    getAxiosClient,
};

export default HttpService;
