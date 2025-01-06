import { Exercise } from '../../entities/Workout';
import { UseUserExerciceListRepository } from '../../interfaces/UseUserExerciceListRepository';

export class CreateExerciceUseCase {
  constructor(private repo: UseUserExerciceListRepository) {}

  async execute(exercise: Omit<Exercise, 'id'>, userId: string) {
    return this.repo.create(exercise, userId);
  }
}
