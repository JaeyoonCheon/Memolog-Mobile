declare module 'document' {
  export interface PageParams {
    id: string;
    cursor: string;
  }
  export interface DocumentPayload {
    title: string;
    form: string;
    userId: string;
    scope: string;
    thumbnail_url: string;
    hashtags: string[];
    created_at: Date;
  }
}
