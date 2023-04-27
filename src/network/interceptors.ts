import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const addCustomHeaders = (req: AxiosRequestConfig) => {
  const request = {
    ...req,
    headers: {...req.headers, 'custom-header': 'custom'},
  };

  return request;
};

export const handleSuccess = (response: AxiosResponse) => response;

/* eslint-disable no-console */
export const handleError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.log('UnAuthorized');
        break;
      case 400:
        console.log('Bad request');
        break;
      case 404:
        console.log('Not Found');
        break;
      default:
        console.log('Server Error');
        break;
    }
  }
  return Promise.reject(error);
};
