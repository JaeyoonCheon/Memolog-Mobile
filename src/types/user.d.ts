declare module 'user' {
  export interface User {
    id: number;
    name: string;
    email: string;
    nickname: string;
    profile_image_url?: string;
  }
}
