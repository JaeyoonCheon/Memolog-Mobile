declare module 'auth' {
  export interface SignInPayload {
    email: string;
    password: string;
  }
  export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
  }
  export interface CheckEmailDuplicataion {
    email: string;
  }
}
