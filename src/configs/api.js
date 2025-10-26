import axios from "axios";

const apis = axios.create({
    baseURL : "https://resumex-backend-6ncw.onrender.com/"
})
export default apis;