import { Workout } from '../domains/entities/Workout';

interface WorkoutRepository {
  create(data: any): void;
}

class WorkoutRepositoryMemory implements WorkoutRepository {
  workouts: Workout[] = [];

  create(data: any): void {
    const workout = new Workout(
      '1',
      data.title,
      data.description,
      data.duration,
      new Date(),
      new Date(),
      data.type,
      data.author,
      data.exercises
    );
    this.workouts.push(workout);
  }
}
class CreateWorkoutRegisterUseCase {
  constructor(private repo: WorkoutRepository) {}
  execute(data: any) {
    return this.repo.create(data);
  }
}

describe('Workout', () => {
  const repo = new WorkoutRepositoryMemory();

  it('Deve adicionar uma anotação', () => {
    const createWorkoutRegister = new CreateWorkoutRegisterUseCase(repo);

    createWorkoutRegister.execute({
      title: 'Anotação 1',
      description: 'Descrição da anotação 1',
      type: 'muscle',
      author: { id: '1', name: 'Author 1' },
      exercises: [
        {
          id: '1',
          name: 'Leg Press',
          type: 'muscle',
          info: { series: 3, reps: 12, weight: 500 },
        },
      ],
      duration: 110,
    });

    expect(repo.workouts.length).toBe(1);
    expect(repo.workouts[0].title).toBe('Anotação 1');
  });
});
