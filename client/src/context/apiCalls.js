import axios from "axios";

export const URL = "https://video-chat-bert.herokuapp.com";
// export const URL = "http://localhost:5000";
const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signin = (data) => API.post("/api/users/signin", data);
export const register = (data) => API.post("/api/users/register", data);
