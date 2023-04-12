import axiosInstance from './axios';
import {handleSuccess, handleError, addCustomHeaders} from './interceptors';

axiosInstance.interceptors.request.use(addCustomHeaders);
axiosInstance.interceptors.response.use(handleSuccess, handleError);

export default axiosInstance;
