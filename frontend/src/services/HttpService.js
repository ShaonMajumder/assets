import axios from "axios";
import Cookies from 'js-cookie'

export const api_url = process.env.REACT_APP_API_URL || "http://localhost:8000"
export const client_url = process.env.REACT_APP_CLIENT_URL || "http://localhost:3000"
export const login_url = process.env.REACT_APP_LOGIN_URL || "api/login"
export const logout_url = process.env.REACT_APP_LOGOUT_URL || "api/logout"
export const csrf_token_url = process.env.REACT_APP_CSRF_TOKEN_URL || "/sanctum/csrf-cookie"

// IF axios.create not used, we set default config for axio, axios.defaults.withCredentials = true

// if logged in (for changing header for a single property of an axios call, here apiClient = const apiClient = axios.create( )
// apiClient.interceptors.request.use(config => {
//     config.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
//     return config;
//   });

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

const _axios = axios.create();

const configure = () => {
    let token_type = Cookies.get('token_type');
    let access_token = Cookies.get('access_token');
    
    _axios.interceptors.request.use((config) => {
        const isLoggedIn = checkLoggedInStatus();
        if (isLoggedIn) {
            config.headers.Authorization = `${token_type} ${access_token}`;
            return config;
        }
    });
}; 

const getAxiosClientAuth = () => {
    let token_type = Cookies.get('token_type');
    let access_token = Cookies.get('access_token');
    
    const _axios = axios.create();
    _axios.interceptors.request.use((config) => {
        const isLoggedIn = checkLoggedInStatus();
        if (isLoggedIn) {
            config.headers.Authorization = `${token_type} ${access_token}`;
            return config;
        }
    });
    return _axios;
}; 

const getAuthTokenHeader = () => {
    let token = Cookies.get('access_token');
    let token_type = Cookies.get('token_type');
    let customHeaders = {
      headers: {
        "Authorization" : `${token_type} ${token}`
      }
    }
    return customHeaders;
}

export const checkLoggedInStatus = () => {
    const isLoggedIn = Cookies.get('loggedIn') === 'true';
    const accessToken = Cookies.get('access_token');
    return isLoggedIn && accessToken;
}

const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient,
    getAxiosClientAuth,
    getAuthTokenHeader,
    checkLoggedInStatus
};

export default HttpService;
