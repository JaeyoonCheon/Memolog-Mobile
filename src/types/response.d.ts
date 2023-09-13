declare module 'api' {
  import axios, {AxiosResponse} from 'axios';
  export interface commonResponse<T> {
    name: string;
    httpCode: number;
    message: string;
    data: T;
    timestamp: Date;
  }
}
