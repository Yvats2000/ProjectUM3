import axios from "axios";

const httpClient = axios.create({
  //baseURL: process.env.API_BASEURL,
  //timeout: process.env.API_TIMEOUT,
  headers: {},
});

httpClient.interceptors.request.use(function (config) {
    return config;
  }, function(error) {
    return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
    return response;
  }, function(error) {
    return Promise.reject(error);
});

export {
  httpClient,
};
