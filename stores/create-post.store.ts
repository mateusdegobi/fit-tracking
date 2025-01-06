import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Exercise } from '@/core/domains/entities/Workout';
import { zustandStorage } from '@/lib/middleware/zustand-mmkv-storage';

type CreatePostPropsType = {
  title: string;
  setTitle: (title: string) => void;

  description: string;
  setDescription: (description: string) => void;

  exercicesChoosed: Exercise[];
  setExercicesChoosed: (exercices: Exercise[]) => void;
};

export const useCreatePostStore = create(
  persist<CreatePostPropsType>(
    (set) => ({
      exercicesChoosed: [],
      setExercicesChoosed: (exercices: Exercise[]) => set({ exercicesChoosed: exercices }),

      title: '',
      setTitle: (title: string) => set({ title }),

      description: '',
      setDescription: (description: string) => set({ description }),
    }),
    { name: 'create-post', storage: createJSONStorage(() => zustandStorage) }
  )
);
