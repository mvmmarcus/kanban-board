import axios, { AxiosPromise, AxiosRequestHeaders } from "axios";
import { clearCookie, getCookie, setCookie } from "utils";
import authApi from "./auth";

const apiBase = axios.create({
  baseURL: "http://localhost:5000",
});

interface ObjectDesc {
  [key: string]: unknown;
}

export enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface CallOptions {
  endpoint: string;
  method: MethodEnum;
  params?: ObjectDesc;
  data?: ObjectDesc;
  headers?: AxiosRequestHeaders;
}

const callApiBase = <T>(call: CallOptions): AxiosPromise<T> => {
  let { headers } = call;

  const { endpoint, method = MethodEnum.GET, params = {}, data = {} } = call;

  // Config Headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Client-Device": "browser",
  };

  headers = { ...defaultHeaders };

  const token = getCookie("jwt");

  if (endpoint !== "/login" && !!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  apiBase.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        clearCookie("jwt");

        try {
          const authResponse = await authApi.login({
            login: "letscode",
            senha: "lets@123",
          });
          setCookie("jwt", authResponse.data);

          return apiBase(error.response.config.url, {
            headers: {
              ...headers,
              Authorization: `Bearer ${authResponse.data}`,
            },
            method: error.response.config.method,
            data: error.response.config.data,
            params: error.response.config.params,
          });
        } catch (error) {
          return error;
        }
      }

      return Promise.reject(error);
    }
  );

  if (method === MethodEnum.GET || method === MethodEnum.DELETE) {
    return apiBase(endpoint, {
      params: { ...params },
      headers,
      method,
    });
  }

  return apiBase(endpoint, {
    headers,
    method,
    data,
  });
};

export default callApiBase;
