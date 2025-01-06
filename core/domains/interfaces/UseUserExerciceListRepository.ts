import { Exercise } from '../entities/Workout';

export interface UseUserExerciceListRepository {
  create(exercise: Omit<Exercise, 'id'>, userId: string): void | Promise<void>;
  get(userId: string): Promise<Exercise[] | null> | null | Exercise[];
  delete(idExercice: string, userId: string): void | Promise<void>;
}
