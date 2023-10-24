declare module 'user' {
  import {Token} from 'auth';
  export interface User {
    id: number;
    name: string;
    email: string;
    nickname: string;
    profile_image_url?: string;
  }
  export interface UserProfile {
    nickname: string;
    profile_image_url?: string;
  }
  export interface UserQueryState {
    token: Token;
    user: User;
  }
}
