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
  verifyEmail(data) {
    return api.post(`/auth/verify`, data);
  }
  updateUser(id, data) {
    return api.put(`/auth/update/${id}`, data);
  }
  addPaymentMethod(id, data) {
    return api.post(`/auth/create-payment-method/${id}`, data);
  }
  deletePaymentMethod(id, paymentId) {
    return api.delete(`/auth/delete-payment-method/${id}/${paymentId}`);
  }
  setAsDefaultPaymentMethod(id, paymentId) {
    return api.put(`/auth/set-as-default-method/${id}/${paymentId}`);
  }
  getCurrentUser(id){
    return api.get(`/auth/${id}`);
  }
  //services
  getActiveServices() {
    return api.get(`/service/avaliable`);
  }
  //services Areas
  getActiveServicesAreas() {
    return api.get(`/serviceArea/avaliable`);
  }
  //order
  createOrder(data) {
    return api.post(`/orders`, data);
  }

  getUserOrders(userId) {
    return api.get(`/orders/user/${userId}`);
  }
  //plans
  getAllPlans() {
    return api.get(`/payment/plans`);
  }
  upgradePlan(data) {
    return api.post(`/payment/create-checkout-session`,data);
  }
  craeteSubscription(sessionId,userId,planId){
    return api.post(`/payment/verify-portal-session?customerId=${sessionId}&userId=${userId}&planId=${planId}`)
  }
}

export default new ApiServices();
