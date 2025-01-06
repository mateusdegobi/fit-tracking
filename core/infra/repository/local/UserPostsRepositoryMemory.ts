import { PostGroupProps } from '../../../domains/entities/SquadGroup';
import { UserPostsRepository } from '../../../domains/interfaces/UserPostsRepository';

export class UserPostsRepositoryMemory implements UserPostsRepository {
  currentUserID: string = '';
  posts: PostGroupProps[] = [];

  create(data: any): void {
    this.posts.push(data);
  }
  getPostById(id: string): PostGroupProps | undefined {
    return this.posts.find((item) => item.id === id);
  }
}
