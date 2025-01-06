import { Exercise } from './Workout';

export class CollectionWorkout {
  id: string;
  name: string;
  exercises: Exercise[];

  constructor(props: CollectionWorkout) {
    this.id = props.id;
    this.name = props.name;
    this.exercises = props.exercises;
  }
}
