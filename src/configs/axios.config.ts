import axios, { AxiosError, AxiosResponse } from 'axios';
import ApiResponseError from '../exception/apiResponseError';

const defaultConfig = {
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const client = axios.create(defaultConfig);

// 요청 인터셉터 추가
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
client.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.error) {
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

export { client };
