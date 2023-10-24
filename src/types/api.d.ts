declare module 'api' {
  export interface APIResponse<T> {
    httpStatusCode: number;
    result?: T;
    errorCode?: number;
    message?: string;
  }
}
