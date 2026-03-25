
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
import { TimeRange } from '../enums/enums';

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

export const getStatsForTimeRange = (startTime, endTime) => {
	// both start time and end time are in timestamp format
	// i want the following metrics, and for each metric I want null if it is not 
	// valid for given time range
	// 1. total workouts
	// 2. maximum streak for workouts 
	// 3. average sets per workout
	// 4. average weekly sessions
	// 5. favourite exercise (most performed exercise)
	// 6. busiest day (day with most workouts)
	// return an object which contains all these metrics 

	const allWorkouts = databaseController.getAllWorkouts();

	const workoutsInRange = allWorkouts.filter(workout => {
		const t = new Date(workout.startTime).getTime();
		return t >= startTime && t <= endTime;
	});

	const totalWorkouts = workoutsInRange.length > 0 ? workoutsInRange.length : null;

	// 2. Maximum streak (consecutive days with workouts) within range
	let maximumStreak: number | null = null;
	if (workoutsInRange.length > 0) {
		const dayStrings = new Set(
			workoutsInRange.map(w => {
				const d = new Date(w.startTime);
				return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
			})
		);
		const sortedDays = Array.from(dayStrings).sort();
		let maxStreak = 1;
		let currentStreak = 1;
		for (let i = 1; i < sortedDays.length; i++) {
			const prev = new Date(sortedDays[i - 1]);
			const curr = new Date(sortedDays[i]);
			const diffMs = curr.getTime() - prev.getTime();
			const diffDays = diffMs / (1000 * 60 * 60 * 24);
			if (diffDays === 1) {
				currentStreak++;
				maxStreak = Math.max(maxStreak, currentStreak);
			} else {
				currentStreak = 1;
			}
		}
		maximumStreak = maxStreak;
	}

	// 3. Average sets per workout
	let averageSets: number | null = null;
	if (workoutsInRange.length > 0) {
		const totalSets = workoutsInRange.reduce((sum, workout) => {
			const setsInWorkout = (workout.exercises || []).reduce((s: number, ex: any) => {
				return s + (Array.isArray(ex.sets) ? ex.sets.length : 0);
			}, 0);
			return sum + setsInWorkout;
		}, 0);
		averageSets = Math.round((totalSets / workoutsInRange.length) * 10) / 10;
	}

	// 4. Average weekly sessions
	let averageWeeklySessions: number | null = null;
	const rangeMs = endTime - startTime;
	const rangeWeeks = rangeMs / (1000 * 60 * 60 * 24 * 7);
	if (workoutsInRange.length > 0 && rangeWeeks >= 1) {
		averageWeeklySessions = Math.round((workoutsInRange.length / rangeWeeks) * 10) / 10;
	}

	// 5. Favourite exercise (most performed by number of sets)
	let favouriteExercise: string | null = null;
	if (workoutsInRange.length > 0) {
		const exerciseSetCount: Record<string, number> = {};
		workoutsInRange.forEach(workout => {
			(workout.exercises || []).forEach((ex: any) => {
				if (!exerciseSetCount[ex.exerciseId]) exerciseSetCount[ex.exerciseId] = 0;
				exerciseSetCount[ex.exerciseId] += Array.isArray(ex.sets) ? ex.sets.length : 1;
			});
		});
		const topId = Object.entries(exerciseSetCount).sort((a, b) => b[1] - a[1])[0]?.[0];
		if (topId) {
			const exercise = databaseController.getExerciseById(topId);
			favouriteExercise = exercise ? exercise.name : topId;
		}
	}

	// 6. Busiest day (day of week with most workouts)
	const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let busiestDay: string | null = null;
	if (workoutsInRange.length > 0) {
		const dayCount: Record<number, number> = {};
		workoutsInRange.forEach(workout => {
			const day = new Date(workout.startTime).getDay();
			dayCount[day] = (dayCount[day] || 0) + 1;
		});
		const topDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0];
		if (topDay !== undefined) {
			busiestDay = DAY_NAMES[parseInt(topDay)];
		}
	}

	return {
		totalWorkouts,
		maximumStreak,
		averageSets,
		averageWeeklySessions,
		favouriteExercise,
		busiestDay,
	};
}

export const getTimeRangeIntervalFormat = (timeRange: string) => {
	const now = new Date();
	const endTime = now.getTime();
	let startTime: number;

	switch (timeRange) {
		case TimeRange.All:
			// For all time, start from epoch (timestamp 0)
			startTime = 0;
			break;
		case TimeRange.OneYear:
			const oneYearAgo = new Date(now);
			oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
			startTime = oneYearAgo.getTime();
			break;
		case TimeRange.SixMonths:
			const sixMonthsAgo = new Date(now);
			sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
			startTime = sixMonthsAgo.getTime();
			break;
		case TimeRange.ThreeMonths:
			const threeMonthsAgo = new Date(now);
			threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
			startTime = threeMonthsAgo.getTime();
			break;
		case TimeRange.OneMonth:
			const oneMonthAgo = new Date(now);
			oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
			startTime = oneMonthAgo.getTime();
			break;
		case TimeRange.OneWeek:
			const oneWeekAgo = new Date(now);
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
			startTime = oneWeekAgo.getTime();
			break;
		default:
			startTime = 0;
	}

	return {
		start: startTime,
		end: endTime,
	};
}
