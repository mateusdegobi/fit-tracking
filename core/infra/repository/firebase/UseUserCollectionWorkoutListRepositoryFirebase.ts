import { CollectionWorkout } from '../../../domains/entities/CollectionWorkout';
import { UseUserCollectionWorkoutListRepository } from '../../../domains/interfaces/UseUserCollectionWorkoutListRepository';
import database from '@react-native-firebase/database';

export class UseUserCollectionWorkoutListRepositoryFirebase
  implements UseUserCollectionWorkoutListRepository
{
  async get(userId: string) {
    const db = database();
    const ref = db.ref(`collectionWorkouts/${userId}/collection`);
    const snapshot = (await ref.once('value')).val();

    if (snapshot) {
      const result: CollectionWorkout[] = Object.entries(snapshot).map(([key, value]) => ({
        ...(value as CollectionWorkout),
        id: key,
      }));

      const resultWithExercisesArray = result.map((item) => {
        const exercises = Object.entries(item.exercises).map(([key, value]) => ({
          ...(value as any),
          id: key,
        }));

        return {
          ...item,
          exercises,
        };
      });

      return resultWithExercisesArray;
    } else {
      return [];
    }
  }

  async create(collection: Omit<CollectionWorkout, 'id'>, userId: string) {
    const db = database();
    const ref = db.ref(`collectionWorkouts/${userId}/collection`);

    const exercicesObj = collection.exercises.reduce((acc, item) => {
      acc[item.id] = item;
      delete acc[item.id].id;
      return acc;
    }, {});

    collection.exercises = exercicesObj;

    ref.push(collection);
  }
}
