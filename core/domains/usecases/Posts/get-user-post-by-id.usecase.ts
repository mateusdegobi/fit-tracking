import { UserPostsRepository } from '../../interfaces/UserPostsRepository';

export class GetUserPostByIdUseCase {
  constructor(private repo: UserPostsRepository) {}
  execute(id: string) {
    return this.repo.getPostById(id);
  }
}
