export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  equipment?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
  duration?: number;
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  reps: number;
  weight?: number;
  duration?: number;
}
