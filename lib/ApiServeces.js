import axios from "axios";
import { API_BASE_URI } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },

});

class ApiServices {
    //Auth
    signup(data) {
        return api.post(`/auth/register`, data);
      }
      signin(data) {
        return api.post(`/auth/login`, data);
      }  
    verifyEmail(data){
        return api.post(`/auth/verify`, data);
    } 
    updateUser(id,data){
        return api.put(`/auth/update/${id}`, data);
    }   
}

export default new ApiServices();