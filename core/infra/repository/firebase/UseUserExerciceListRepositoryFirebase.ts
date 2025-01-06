import { Exercise } from "../../../domains/entities/Workout";
import { UseUserExerciceListRepository } from "../../../domains/interfaces/UseUserExerciceListRepository";
import {
  getDatabase,
  ref,
  push,
  get as getFB,
  remove,
} from "firebase/database";

export class UseUserExerciceListRepositoryFirebase
  implements UseUserExerciceListRepository
{
  async create(exercise: Omit<Exercise, "id">, userId: string) {
    const db = getDatabase();
    const dbRef = ref(db, `userExercises/${userId}/exercices`);
    push(dbRef, exercise);
  }
  async get(userId: string) {
    const db = getDatabase();
    const dbRef = ref(db, `userExercises/${userId}/exercices`);
    const snap = await getFB(dbRef)
    if (snap.exists()) {
      const result: Exercise[] = Object.entries(snap.val()).map(
        ([key, value]) => ({
          ...(value as Exercise),
          id: key,
        })
      );
      console.log('result', result)
      return result;
    } else {
      return [];
    }
  }
  async delete(idExercice: string, userId: string) {
    const db = getDatabase();
    const dbRef = ref(db, `userExercises/${userId}/exercices/${idExercice}`);
    remove(dbRef);
  }
}
