import { Exercise, Workout } from '../types';
import { dummyExercises } from '../dummy/exercises';
import { dummyWorkouts } from '../dummy/workouts';
import { routines as dummyRoutines } from '../dummy/routines';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DatabaseController {
  private exercises =null;
  private workouts= null;
  private routines =null;
  // Routines CRUD
  getAllRoutines() {
    return [...this.routines];
  }

  getRoutineById(id) {
    return this.routines.find(routine => routine.id === id);
  }

  async addRoutine(routine) {
    const newRoutine = { ...routine, id: Date.now().toString() };
    this.routines.push(newRoutine);
    await this.syncRoutinesWithAsyncStorage();
    return newRoutine;
  }

  async updateRoutine(id, updates) {
    const index = this.routines.findIndex(routine => routine.id === id);
    if (index === -1) return undefined;
    this.routines[index] = { ...this.routines[index], ...updates };
    await this.syncRoutinesWithAsyncStorage();
    return this.routines[index];
  }

  async deleteRoutine(id) {
    const index = this.routines.findIndex(routine => routine.id === id);
    if (index === -1) return false;
    this.routines.splice(index, 1);
    await this.syncRoutinesWithAsyncStorage();
    return true;
  }

  getAllExercises(): Exercise[] {
    return [...this.exercises];
  }

  getExerciseById(id: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.id === id);
  }

  async addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
    };
    this.exercises.push(newExercise);
    await this.syncExercisesWithAsyncStorage();
    return newExercise;
  }

  async updateExercise(id: string, updates: Partial<Exercise>): Promise<Exercise | undefined> {
    const index = this.exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return undefined;
    
    this.exercises[index] = { ...this.exercises[index], ...updates };
    await this.syncExercisesWithAsyncStorage();
    return this.exercises[index];
  }

  async deleteExercise(id: string): Promise<boolean> {
    const index = this.exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return false;
    
    this.exercises.splice(index, 1);
    await this.syncExercisesWithAsyncStorage();
    return true;
  }

  getAllWorkouts(): Workout[] {
    return [...this.workouts];
  }

  getWorkoutById(id: string): Workout | undefined {
    return this.workouts.find(workout => workout.id === id);
  }

  async addWorkout(workout: Omit<Workout, 'id'>): Promise<Workout> {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };
    this.workouts.push(newWorkout);
    await this.syncWorkoutsWithAsyncStorage();
    return newWorkout;
  }

  async updateWorkout(id: string, updates: Partial<Workout>): Promise<Workout | undefined> {
    const index = this.workouts.findIndex(workout => workout.id === id);
    if (index === -1) return undefined;
    
    this.workouts[index] = { ...this.workouts[index], ...updates };
    await this.syncWorkoutsWithAsyncStorage();
    return this.workouts[index];
  }

  async deleteWorkout(id: string): Promise<boolean> {
    const index = this.workouts.findIndex(workout => workout.id === id);
    if (index === -1) return false;
    
    this.workouts.splice(index, 1);
    await this.syncWorkoutsWithAsyncStorage();
    return true;
  }

  // AsyncStorage getters
  async getExercisesFromAsyncStorage(): Promise<Exercise[]> {
    try {
      const data = await AsyncStorage.getItem('@FitForge:exercises');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting exercises from AsyncStorage:', error);
      return [];
    }
  }

  async getRoutinesFromAsyncStorage(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem('@FitForge:routines');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting routines from AsyncStorage:', error);
      return [];
    }
  }

  async getWorkoutsFromAsyncStorage(): Promise<Workout[]> {
    try {
      const data = await AsyncStorage.getItem('@FitForge:workouts');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting workouts from AsyncStorage:', error);
      return [];
    }
  }

  // Sync functions to save to AsyncStorage
  async syncExercisesWithAsyncStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem('@FitForge:exercises', JSON.stringify(this.exercises));
    } catch (error) {
      console.error('Error syncing exercises to AsyncStorage:', error);
    }
  }

  async syncRoutinesWithAsyncStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem('@FitForge:routines', JSON.stringify(this.routines));
    } catch (error) {
      console.error('Error syncing routines to AsyncStorage:', error);
    }
  }

  async syncWorkoutsWithAsyncStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem('@FitForge:workouts', JSON.stringify(this.workouts));
    } catch (error) {
      console.error('Error syncing workouts to AsyncStorage:', error);
    }
  }

  async overallSyncWithAsyncStorage(): Promise<void> {
    await this.syncExercisesWithAsyncStorage();
    await this.syncRoutinesWithAsyncStorage();
    await this.syncWorkoutsWithAsyncStorage();
  }

  // Setters for initializing from AsyncStorage
  setExercises(exercises: Exercise[]) {
    this.exercises = exercises;
    this.syncExercisesWithAsyncStorage()
  }

  setRoutines(routines: any[]) {
    this.routines = routines;
    this.syncRoutinesWithAsyncStorage();
  }

  setWorkouts(workouts: Workout[]) {
    this.workouts = workouts;
    this.syncWorkoutsWithAsyncStorage();
  }
}

export const databaseController = new DatabaseController();
