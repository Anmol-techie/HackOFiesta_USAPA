import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const serverUrl = "http://localhost";

const API = axios.create({
  baseURL: serverUrl,
});

export const useAPI = makeUseAxios({
  axios: API,
});

API.defaults.headers.common = {
  "Access-Control-Allow-Origin": "*",
};

export default API;
