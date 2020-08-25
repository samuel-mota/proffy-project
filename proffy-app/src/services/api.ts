import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.43.243:3333", // home ip
  baseURL: "http://10.11.10.26:3333", // work ip
});

export default api;
