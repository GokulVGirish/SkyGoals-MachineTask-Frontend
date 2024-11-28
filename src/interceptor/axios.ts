import axios from "axios"

const mainUrl = import.meta.env.VITE_MAIN_URL;
const instance=axios.create({
    baseURL:mainUrl,
      headers: {
    "Content-Type": "application/json",
  },
})
instance.interceptors.response.use(
  (response) => response,
  (error) => {
 
    return Promise.reject(error);
  }
);
export default instance