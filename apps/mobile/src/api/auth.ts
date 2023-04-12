import {AxiosResponse} from 'axios';
import axiosInstance from '../network';
import axiosInstanceWithAbort from '../network/abortAxios';

type LoginInput = {
  username: string;
  password: string;
};
type LoginResponse = {
  accessToken: string;
  name: string;
};

type ResponseWithAbort<T> = {
  ajaxPromise: Promise<T>;
  abort: () => void;
};

type ResponseWithoutAbort<T> = T;

export const AuthActions = {
  login: <T = LoginResponse>(
    data: LoginInput,
  ): Promise<ResponseWithoutAbort<T>> =>
    new Promise((resolve, reject) => {
      const promise = axiosInstance.post('/login', data);
      promise
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }),

  loginWithAbort: <T = LoginResponse>(
    data: LoginInput,
  ): ResponseWithAbort<T> => {
    const {axiosPromise, abort} = axiosInstanceWithAbort.post('/login', data);
    return {
      ajaxPromise: new Promise<T>((resolve, reject) => {
        axiosPromise
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      }),
      abort,
    };
  },

  getUser: <T = LoginResponse>(Id: number): Promise<T> =>
    new Promise((resolve, reject) => {
      const promise = axiosInstance.get(
        `https://jsonplaceholder.typicode.com/users/${Id}`,
      );
      promise
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }),
};

export default AuthActions;
