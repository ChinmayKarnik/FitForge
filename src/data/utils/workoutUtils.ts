import { databaseController } from '../controllers';

export function getExercisesListFromWorkout(workout: any) {
  const setsCount: Record<string, number> = {};

  if (!workout || !Array.isArray(workout.exercises)) return [];

  workout.exercises.forEach((ex: any) => {
    if (!setsCount[ex.exerciseId]) {
      setsCount[ex.exerciseId] = 0;
    }
    setsCount[ex.exerciseId]++;
  });

  return Object.entries(setsCount).map(([exerciseId, sets]) => {
    const exercise = databaseController.getExerciseById(exerciseId);
    return {
      name: exercise ? exercise.name : exerciseId,
      sets,
    };
  });
}

