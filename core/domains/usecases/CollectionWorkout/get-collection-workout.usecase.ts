import { UseUserCollectionWorkoutListRepository } from '../../interfaces/UseUserCollectionWorkoutListRepository';

export class GetCollectionWorkoutUseCase {
  constructor(private repo: UseUserCollectionWorkoutListRepository) {}

  async execute(userId: string) {
    return await this.repo.get(userId);
  }
}
