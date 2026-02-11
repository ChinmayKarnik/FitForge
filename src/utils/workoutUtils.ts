
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



