import axios from "axios";

export const httpClient = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      "Accept": 'application/json'
    },
  });
};

export const fetch = (url, params = {}) =>
  httpClient().get(url, { params });

export const create = (url, data) =>
  httpClient().post(url, data);  
