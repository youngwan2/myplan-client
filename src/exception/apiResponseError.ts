export default class ApiResponseError extends Error {
  statusCode?: number;
  response?: any;

  constructor(message: string, statusCode?: number, response?: any) {
    super(message);
    this.name = 'ApiResponseError';
    this.statusCode = statusCode;
    this.response = response;
  }
}
