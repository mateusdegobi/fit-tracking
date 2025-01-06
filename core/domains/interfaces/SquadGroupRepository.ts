import { PostGroupProps, SquadGroup } from '../entities/SquadGroup';

export interface SquadGroupRepository {
  create(data: SquadGroup): Promise<SquadGroup> | SquadGroup;
  postWorkoutInSquadGroup(post: PostGroupProps, idGroup: string): void;
  getPosts(squadId: string): Promise<PostGroupProps[] | undefined> | PostGroupProps[] | undefined;
}
