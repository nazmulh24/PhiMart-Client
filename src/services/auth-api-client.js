import axios from "axios";

const AuthApiClient = axios.create({
  baseURL: "https://phi-mart-dun.vercel.app/api/v1",
});

export default AuthApiClient;

AuthApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
