import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '.';

export default axios.create({ baseURL: API_URL });

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let accessToken = '';

const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  if (request.headers) {
    request.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : null;
    return request;
  } else {
    return request;
  }
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  accessToken = response.data.accessToken;
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const prevRequest = error.config as AxiosRequestConfig & { sent: boolean };
  if (error?.response?.status === 401 && !prevRequest.sent) {
    prevRequest.sent = true;
    try {
      const response = await axiosPrivate.get('/auth/refresh');
      if (prevRequest.headers) {
        prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      }
      return axiosPrivate({
        ...prevRequest,
        headers: JSON.parse(JSON.stringify(prevRequest.headers)),
      });
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  }
  if (error?.response?.status === 403) {
    localStorage.clear();
    window.location.reload();
    console.log('call');
    return;
  }

  return Promise.reject(error);
};

axiosPrivate.interceptors.response.use(onResponse, onResponseError);
axiosPrivate.interceptors.request.use(onRequest, onRequestError);
