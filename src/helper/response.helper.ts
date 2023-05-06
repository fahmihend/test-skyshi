import { HttpException } from '@nestjs/common';
import { Pagination, PaginationOptions } from './pagination.helper';

export class Response {
  status: string;
  message: string;
  data: any;

  constructor(status: string, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export const response = (status: string, message: string, data: any = null) =>
  new Response(status, message, data);

export const responsePage = (
  results: any[],
  total: number,
  paginationOptions: PaginationOptions,
) => {
  return new Pagination(results, total, paginationOptions);
};

export const responseError = (message: any, code = 400) => {
  return Promise.reject(new HttpException(message, code));
};
