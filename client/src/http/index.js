import axios from "axios"
import Cookies from "js-cookie";

const api = axios.create({
    baseURL : process.env.REACT_APP_HOST_URL,
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization:Cookies.get("jwt")
  },
})

export const signup = (data)=>api.post("/auth/signup",data);
export const login = (data)=>api.post("/auth/login",data);
export const chat = (data)=>api.post("/auth",data);
export const verify = ()=>api.get("/verifytoken");

export default api;