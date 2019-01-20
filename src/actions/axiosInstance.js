import axios from 'axios';

const axiosInstance = ()=>{
    axios.interceptors.request.use(config=> {
        // Do something before request is sent
        const auth_token = localStorage.getItem("auth_token");
        config.headers.Authorization=auth_token;
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
}

module.exports = axiosInstance;