import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://song-recommender-backend.onrender.com",
  baseURL: "http://localhost:4000",
});

export default axiosInstance;
