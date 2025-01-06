import { PostGroupProps } from '../../entities/SquadGroup';
import { SquadGroupRepository } from '../../interfaces/SquadGroupRepository';

export class PostWorkoutInSquadGroupUseCase {
  constructor(private repo: SquadGroupRepository) {}
  execute(post: Omit<PostGroupProps, 'id'>, idGroup: string) {
    return this.repo.postWorkoutInSquadGroup(post, idGroup);
  }
}
