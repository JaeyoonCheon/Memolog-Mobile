declare module 'auth' {
  export interface Token {
    accessToken: string;
    refreshToken: string;
  }
  export interface SignInPayload {
    email: string;
    password: string;
  }
  export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
  }
  export interface VerifyEmailPayload {
    email: string;
  }
}
