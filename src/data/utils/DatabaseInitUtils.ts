

import { databaseController } from '../controllers/DatabaseController';
import { dummyExercises } from '../dummy/exercises';
import { dummyWorkouts } from '../dummy/workouts';
import { routines as dummyRoutines } from '../dummy/routines';

export const initializeDatabase = async () => {
  try {
    const exercises = await databaseController.getExercisesFromAsyncStorage();
    const routines = await databaseController.getRoutinesFromAsyncStorage();
    const workouts = await databaseController.getWorkoutsFromAsyncStorage();
    
    console.log("ckck exercises,routines,workouts from async", exercises, routines, workouts);
    if (exercises.length === 0 && routines.length === 0 && workouts.length === 0) {
      databaseController.setExercises([...dummyExercises]);
      databaseController.setRoutines(dummyRoutines.map(r => ({ ...r, exercises: r.exercises.map(e => ({ ...e })) })));
      databaseController.setWorkouts([...dummyWorkouts]);
    } else {
      databaseController.setExercises(exercises);
      databaseController.setRoutines(routines);
      databaseController.setWorkouts(workouts);
    }

  } catch (error) {
    console.error('Error initializing database:', error);
  }
};