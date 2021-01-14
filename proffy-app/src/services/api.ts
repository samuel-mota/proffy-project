import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.62:3333", // localhost ip from expo 
  //baseURL: "http://10.11.10.26:3333", // work ip
});

export default api;
