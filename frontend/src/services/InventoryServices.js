import axios from "axios";
import Cookies from "js-cookie";
import { HTTP_OK, HTTP_CREATED } from "../utils/HttpStatusCode";
import HttpService from "./HttpService";


export const postInventory = async (value) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.post(`${process.env.REACT_APP_API_URL}/inventory`,value);
        
        if (response.status !== HTTP_CREATED) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const updateInventory = async (id, value) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.post(`${process.env.REACT_APP_API_URL}/inventory/${id}`,value);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const listInventory = async () => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.get(`${process.env.REACT_APP_API_URL}/inventory`);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const listLogsFilesAndDir = async (id) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.get(`${process.env.REACT_APP_API_URL}/logs/`);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const listInventoryHistory = async (id) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.get(`${process.env.REACT_APP_API_URL}/inventory/history/${id}`);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const getInventory = async (id) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.get(`${process.env.REACT_APP_API_URL}/inventory/${id}`);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const deleteInventory = async (id) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.delete(`${process.env.REACT_APP_API_URL}/inventory/${id}`);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}

export const bulkFileDownloader = async (export_type) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.get(`${process.env.REACT_APP_API_URL}/inventory/download/${export_type}/bulk`);
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
    }
    return response; 
}

export const fileDownloader = async (id,export_type,access_type=null) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        let url;
        if(access_type){
            url = `${process.env.REACT_APP_API_URL}/inventory/download/${access_type}/${export_type}/${id}`;
        }else{
            url = `${process.env.REACT_APP_API_URL}/inventory/download/${export_type}/${id}`;
        }

        response = await axiosClient.get(url);
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
    }
    return response; 
}

export const postLogin = async (values) => {
    let response = {};
    try {
        // const axiosClient = HttpService.getAxiosClientAuth();
        response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,values);
        console.log("response",response)
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
    }
    return response; 
}

export const postLogout = async (values) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClientAuth();
        response = await axiosClient.post(`${process.env.REACT_APP_API_URL}/logout`,{});
        console.log("response",response)
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
    }
    return response; 
}