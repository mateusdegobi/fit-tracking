import { SquadGroupRepository } from '../../interfaces/SquadGroupRepository';

export class GetPostsSquadGroupUseCase {
  constructor(private repo: SquadGroupRepository) {}
  execute(squadId: string) {
    return this.repo.getPosts(squadId);
  }
}
