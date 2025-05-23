export type PostType = 'totu' | 'boko';

export interface Post {
  rkey: string;
  text: string;
  type: PostType;
  createdAt: Date;
  did: string;
  record: string;
}

export interface AppVercelDekobokoPostRecord {
  text: string;
  type: PostType;
  createdAt: string;
}
