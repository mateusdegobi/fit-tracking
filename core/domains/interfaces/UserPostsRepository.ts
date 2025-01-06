import { PostGroupProps } from '../entities/SquadGroup';
import { Workout } from '../entities/Workout';

export interface UserPostsRepository {
  create(data: Workout, currentUserId: string): void;
  getPostById(id: string, currentUserId: string): PostGroupProps | undefined;
}
