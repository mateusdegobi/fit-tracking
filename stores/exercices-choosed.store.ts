import { Exercise } from '@/core/domains/entities/Workout';
import { create } from 'zustand';

type StoreType = {
  exercicesChoosed: Exercise[];
  setExercicesChoosed: (exercices: Exercise[]) => void;
};

export const useExercicesChoosedStore = create<StoreType>((set) => ({
  exercicesChoosed: [],
  setExercicesChoosed: (exercices: Exercise[]) => set({ exercicesChoosed: exercices }),
}));
