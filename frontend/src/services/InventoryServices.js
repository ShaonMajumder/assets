import { HTTP_OK } from "../utils/HttpStatusCode";
import HttpService from "./HttpService";


export const postInventory = async (value) => {
    let response = {};
    try {
        const axiosClient = HttpService.getAxiosClient();
        response = await axiosClient.post(`${process.env.REACT_APP_API_URL}/inventory`,value);
        
        if (response.status !== HTTP_OK) {
            throw new Error(`Error! status: ${response.statusText}`);
        }
    } catch (err) {
        console.log(err);
        response = err.response;
        
    }
    return response;
}