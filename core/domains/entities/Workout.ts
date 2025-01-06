type WorkoutType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  author: AuthorWorkout;
  exercises: Exercise[];
};

export class Workout {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  author: AuthorWorkout;
  exercises: Exercise[];

  constructor(props: WorkoutType) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.duration = props.duration;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.type = props.type;
    this.author = props.author;
    this.exercises = props.exercises;
  }
}

export class AuthorWorkout {
  constructor(public id: string, public name: string) {}
}

export class Exercise {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public info: InfoExercise
  ) {}
}

export type SeriesProps = {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  distanceUnit?: 'km' | 'mi';
  pace?: number;
};

export class InfoExercise {
  constructor(
    public series?: SeriesProps[],
    public weightUnit?: 'kg' | 'lbs',
    public weight?: number, // maxWeight
    public minPace?: number
  ) {}
}
