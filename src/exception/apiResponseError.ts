export default class ApiResponseError extends Error {
  statusCode: number;
  response?: any;

  constructor(message: string, statusCode: number, response?: any) {
    super(`API 요청 실패 에러:  ${statusCode} :: ${message}`);
    this.name = 'ApiResponseError';
    this.statusCode = statusCode;
    this.response = response;
  }
}
