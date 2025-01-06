import { FullPost, MinimalPost } from '../entities/Post';

export type CreatePostProps = {
  post: {
    full: FullPost;
    minimal: MinimalPost;
  };
  groupId: string;
};

export interface GroupPostRepositoryInterface {
  createPost: (props: CreatePostProps) => Promise<void>;
  getAllPosts: (groupId: string) => Promise<MinimalPost[]>;
  getPostById: (groupId: string, postId: string) => Promise<FullPost | null>;
  deletePost: (groupId: string, postId: string) => Promise<void>;
}
