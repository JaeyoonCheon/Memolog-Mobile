declare module 'document' {
  export interface PageParams {
    id: string;
    cursor: string;
  }
  export interface Document {
    documentId: number;
    title: string;
    userId: number;
    created_at: Date;
    scope: string;
  }
  export interface Hashtag {
    id: number;
    name: string;
  }
  export interface DocumentDetail extends Document {
    form: string;
    hashtags: Hashtag[];
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
