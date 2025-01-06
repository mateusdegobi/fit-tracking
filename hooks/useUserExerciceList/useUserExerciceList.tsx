import { useCallback, useRef } from 'react';
import { Exercise } from '../../core/domains/entities/Workout';
import { CreateExerciceUseCase } from '../../core/domains/usecases/UseUserExerciceList/create-exercice.usecase';
import { UseUserExerciceListRepositoryFirebase } from '../../core/infra/repository/firebase/UseUserExerciceListRepositoryFirebase';
import { getAuth } from 'firebase/auth';

type CreateExerciseProps = {
  name: string;
  type: string;
  weight: string;
  weightUnit: string;
};

export function useUserExerciceList() {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const repo = useRef(new UseUserExerciceListRepositoryFirebase()).current;

  const createExercise = useCallback(
    async ({ name, type, weight, weightUnit }: CreateExerciseProps) => {
      if (!uid) return;

      const exercise: Omit<Exercise, 'id'> = {
        name,
        type,
        info: {
          weight: Number(weight),
          weightUnit: weightUnit as 'kg' | 'lbs',
        },
      };

      const createExerciceUseCase = new CreateExerciceUseCase(repo);
      await createExerciceUseCase.execute(exercise, uid);
    },
    [repo]
  );

  const getExercises = useCallback(async () => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    if (!uid) return;

    return repo.get(uid);
  }, [repo]);

  return {
    createExercise,
    getExercises,
  };
}
