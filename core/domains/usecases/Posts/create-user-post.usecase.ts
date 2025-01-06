import { FullPost } from '../../entities/Post';
import { UserPostsRepository } from '../../interfaces/UserPostsRepository';

export class CreateUserPostUseCase {
  constructor(private repo: UserPostsRepository) {}
  execute(data: FullPost) {
    return this.repo.create(data);
  }
}
