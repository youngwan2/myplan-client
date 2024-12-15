import axios, { AxiosError, AxiosResponse } from 'axios';
import ApiResponseError from '../exception/apiResponseError';

const axiosConfig = {
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  credential: true,
};

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.message) {
      throw new ApiResponseError(
        `${response.data.message}`,
        response.status,
        response.data,
      );
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiResponseError(
        `요청이 ${error.response.status} 상태 코드로 실패했습니다.`,
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      throw new ApiResponseError('서버로부터 응답을 받지 못했습니다.', 0);
    } else {
      throw new ApiResponseError(`Axios 요청 오류: ${error.message}`, 0);
    }
  },
);

export const client = axios.create(axiosConfig);
