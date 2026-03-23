
/**
 * Calculates the estimated time (in seconds) for a routine exercise.
 * Assumes 1 minute (60s) per working set, plus rest time between sets.
 * @param {Object} exercise - The exercise object (from a routine)
 * @returns {number} Estimated time in seconds
 */
export function getEstimatedExerciseTimeSeconds(exercise: any): number {
	if (!exercise || typeof exercise.sets !== 'number' || exercise.sets <= 0) return 0;
	const sets = exercise.sets;
	const rest = typeof exercise.rest === 'number' && exercise.rest > 0 ? exercise.rest : 0;
	// There are (sets - 1) rest periods between sets
	const totalRest = rest * Math.max(sets, 0);
	const totalWork = sets * 60; // 1 min per set
	return totalWork + totalRest;
}
import { databaseController } from '../data/controllers';

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

export const doesDayHaveWorkout = (date: Date) => {
  // Get all workouts from the singleton DatabaseController instance
  // (Assuming a singleton instance is exported elsewhere, otherwise create one here)
  console.log('ckck date here',date.getDate(),date.getMonth(),date.getFullYear());
  const allWorkouts = databaseController.getAllWorkouts();
  // Compare only year, month, and day
  return allWorkouts.some(workout => {
    const workoutDate = new Date(workout.startTime);
    return (
      workoutDate.getFullYear() === date.getFullYear() &&
      workoutDate.getMonth() === date.getMonth() &&
      workoutDate.getDate() === date.getDate()
    );
  });
};

export function getStreakForDate(date: Date) {
  let streak = 0;
  let currentDate = new Date(date);
  
  // Work backwards from the given date, counting consecutive days with workouts
  while (doesDayHaveWorkout(currentDate)) {
    streak++;
    // Move to the previous day
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
}

export function getCurrentWeekWorkoutCount() {
	const allWorkouts = databaseController.getAllWorkouts();
	const today = new Date(); 
	// Get the start of the week (Sunday)
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay());
	startOfWeek.setHours(0, 0, 0, 0);

	// End of today
	const endOfToday = new Date(today);
	endOfToday.setHours(23, 59, 59, 999);

	// For testing: collect and print all workout days in the week
	const workoutDaySet = new Set<string>();
	const count = allWorkouts.filter(workout => {
		const workoutDate = new Date(workout.startTime);
		const inWeek = workoutDate >= startOfWeek && workoutDate <= endOfToday;
		if (inWeek) {
			workoutDaySet.add(workoutDate.toDateString());
		}
		return inWeek;
	}).length;
	console.log('Workout days this week:', Array.from(workoutDaySet));
	return workoutDaySet.size;
}

export function getAverageWorkoutDurationCurrentWeekMins() {
	const allWorkouts = databaseController.getAllWorkouts();
	const today = new Date(); 
	// Get the start of the week (Sunday)
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay());
	startOfWeek.setHours(0, 0, 0, 0);

	// End of today
	const endOfToday = new Date(today);
	endOfToday.setHours(23, 59, 59, 999);

	// Filter workouts in the current week
	const workoutsThisWeek = allWorkouts.filter(workout => {
		const workoutDate = new Date(workout.startTime);
		return workoutDate >= startOfWeek && workoutDate <= endOfToday;
	});

	if (workoutsThisWeek.length === 0) return 0;

	// If workout.duration is in milliseconds, convert to minutes
	// This function returns the average duration in MINUTES.
	const totalDuration = workoutsThisWeek.reduce((sum, workout) => {
		// Convert ms to min
		return sum + ((workout.duration || 0) / 60000);
	}, 0);

	return Math.round(totalDuration / workoutsThisWeek.length);
}

export const getWorkoutsForADay = (date: Date) => {
	const allWorkouts = databaseController.getAllWorkouts();
	return allWorkouts.filter(workout => {
		const workoutDate = new Date(workout.startTime);
		return (
			workoutDate.getFullYear() === date.getFullYear() &&
			workoutDate.getMonth() === date.getMonth() &&
			workoutDate.getDate() === date.getDate()
		);
	});
}
