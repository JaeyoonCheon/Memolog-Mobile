declare module 'auth' {
  import {User} from 'user';
  export interface Auth {
    token: {
      accessToken: string;
    };
    user: User;
  }
  export interface SignInPayload {
    email: string;
    password: string;
  }
  export interface SignUp {
    token: {
      accessToken: string;
      refreshToken: string;
    };
    user: User;
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
