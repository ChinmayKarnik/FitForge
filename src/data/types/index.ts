export interface ExerciseParameter {
  name: string;
  type: 'number' | 'boolean' | 'string';
  moreIsBetter?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups?: string[];
  equipment?: string;
  requiredParameters?: ExerciseParameter[];
  optionalParameters?: ExerciseParameter[];
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
