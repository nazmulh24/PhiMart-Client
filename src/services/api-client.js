import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://phi-mart-dun.vercel.app/api/v1",
});

export default apiClient;
