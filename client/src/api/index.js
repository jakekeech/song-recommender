import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://song-recommender-backend.onrender.com",
});

export default axiosInstance;
