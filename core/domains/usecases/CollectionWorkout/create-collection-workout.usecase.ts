import { CollectionWorkout } from '../../entities/CollectionWorkout';
import { UseUserCollectionWorkoutListRepository } from '../../interfaces/UseUserCollectionWorkoutListRepository';

export class CreateCollectionWorkoutUseCase {
  constructor(private repo: UseUserCollectionWorkoutListRepository) {}

  async execute(collection: Omit<CollectionWorkout, 'id'>, userId: string) {
    return await this.repo.create(collection, userId);
  }
}
