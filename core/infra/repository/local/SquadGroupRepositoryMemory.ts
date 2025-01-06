import { PostGroupProps, SquadGroup } from '../../../domains/entities/SquadGroup';
import { SquadGroupRepository } from '../../../domains/interfaces/SquadGroupRepository';

export class SquadGroupRepositoryMemory implements SquadGroupRepository {
  groups: SquadGroup[] = [];

  create(data: any): void {
    this.groups.push(data);
  }

  postWorkoutInSquadGroup(post: PostGroupProps, idGroup: string): void {
    const group = this.groups.find((item) => item.id === idGroup);
    group?.posts.push(post);
  }
  getPosts(): PostGroupProps[] {
    return this.groups.map((item) => item.posts).flat();
  }
}
