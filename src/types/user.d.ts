declare module 'user' {
  export interface User {
    token: {
      accessToken: string;
      refreshToken?: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
      nickname: string;
      profile_image_url?: string;
    };
  }
  export interface UserProfile {
    nickname: string;
    profile_image_url?: string;
  }
}
