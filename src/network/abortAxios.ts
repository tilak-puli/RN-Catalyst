/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosInstance from './index';

type AbortAxiosReturnType<R> = {
  axiosPromise: Promise<R>;
  abort: () => void;
};

class AbortAxios {
  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): AbortAxiosReturnType<R> {
    const {signal, abort} = new AbortController();
    return {
      axiosPromise: axiosInstance.get(url, {...config, signal}),
      abort,
    };
  }

  post<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined,
  ): AbortAxiosReturnType<R> {
    const {signal, abort} = new AbortController();
    return {
      axiosPromise: axiosInstance.post(url, data, {...config, signal}),
      abort,
    };
  }

  put<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined,
  ): AbortAxiosReturnType<R> {
    const {signal, abort} = new AbortController();
    return {
      axiosPromise: axiosInstance.put(url, data, {...config, signal}),
      abort,
    };
  }

  delete<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): AbortAxiosReturnType<R> {
    const {signal, abort} = new AbortController();
    return {
      axiosPromise: axiosInstance.delete(url, {...config, signal}),
      abort,
    };
  }

  patch<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined,
  ): AbortAxiosReturnType<R> {
    const {signal, abort} = new AbortController();
    return {
      axiosPromise: axiosInstance.patch(url, data, {...config, signal}),
      abort,
    };
  }
}

const axiosInstanceWithAbort = new AbortAxios();

export default axiosInstanceWithAbort;
