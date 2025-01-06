import { CollectionWorkout } from '../entities/CollectionWorkout';

export interface UseUserCollectionWorkoutListRepository {
  get(userId: string): Promise<CollectionWorkout[] | null> | CollectionWorkout[] | null;
  create(collection: Omit<CollectionWorkout, 'id'>, userId: string): void | Promise<void>;
}
