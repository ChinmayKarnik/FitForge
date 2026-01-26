import { Exercise, Workout } from '../types';
import { dummyExercises } from '../dummy/exercises';
import { dummyWorkouts } from '../dummy/workouts';

class DatabaseController {
  private exercises: Exercise[] = [...dummyExercises];
  private workouts: Workout[] = [...dummyWorkouts];

  getAllExercises(): Exercise[] {
    return [...this.exercises];
  }

  getExerciseById(id: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.id === id);
  }

  addExercise(exercise: Omit<Exercise, 'id'>): Exercise {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
    };
    this.exercises.push(newExercise);
    return newExercise;
  }

  updateExercise(id: string, updates: Partial<Exercise>): Exercise | undefined {
    const index = this.exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return undefined;
    
    this.exercises[index] = { ...this.exercises[index], ...updates };
    return this.exercises[index];
  }

  deleteExercise(id: string): boolean {
    const index = this.exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return false;
    
    this.exercises.splice(index, 1);
    return true;
  }

  getAllWorkouts(): Workout[] {
    return [...this.workouts];
  }

  getWorkoutById(id: string): Workout | undefined {
    return this.workouts.find(workout => workout.id === id);
  }

  addWorkout(workout: Omit<Workout, 'id'>): Workout {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };
    this.workouts.push(newWorkout);
    return newWorkout;
  }

  updateWorkout(id: string, updates: Partial<Workout>): Workout | undefined {
    const index = this.workouts.findIndex(workout => workout.id === id);
    if (index === -1) return undefined;
    
    this.workouts[index] = { ...this.workouts[index], ...updates };
    return this.workouts[index];
  }

  deleteWorkout(id: string): boolean {
    const index = this.workouts.findIndex(workout => workout.id === id);
    if (index === -1) return false;
    
    this.workouts.splice(index, 1);
    return true;
  }
}

export const databaseController = new DatabaseController();
