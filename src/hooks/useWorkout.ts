import { useRef, useState, useEffect } from 'react';
import { Exercise } from '../data/types';

export interface WorkoutState {
  startTime: number;
  endTime?: number;
  duration?: number;
  exercises: ExerciseLog[];
}

export interface ExerciseLog {
  exerciseId: string;
  loggedData: Record<string, any>;
  startTime?: number;
  endTime?: number;
}

export const useWorkoutTimer = () => {
  const startTime = useRef(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime.current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return {
    startTime: startTime.current,
    elapsedTime,
    formatTime,
  };
};

export const useWorkoutState = (startTime: number) => {
  const [workout, setWorkout] = useState<WorkoutState>({
    startTime,
    exercises: [],
  });

  const addExercise = (exercise: ExerciseLog) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));
  };

  const endWorkout = (): WorkoutState => {
    const endTime = Date.now();
    const finalWorkout: WorkoutState = {
      ...workout,
      endTime,
      duration: endTime - startTime,
    };
    setWorkout(finalWorkout);
    return finalWorkout;
  };

  return {
    workout,
    addExercise,
    endWorkout,
  };
};

export const useActiveExercise = (onExerciseComplete: (log: ExerciseLog) => void) => {
  const [activeExercise, setActiveExercise] = useState<(Exercise & { startTime?: number }) | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const startExercise = (exercise: Exercise) => {
    setActiveExercise({ ...exercise, startTime: Date.now() });
  };

  const saveExercise = () => {
    if (!activeExercise) return;

    const exerciseLog: ExerciseLog = {
      exerciseId: activeExercise.id,
      loggedData: formData,
      startTime: activeExercise.startTime,
      endTime: Date.now(),
    };

    onExerciseComplete(exerciseLog);
    resetExercise();
  };

  const discardExercise = () => {
    resetExercise();
  };

  const resetExercise = () => {
    setActiveExercise(null);
    setFormData({});
  };

  return {
    activeExercise,
    formData,
    setFormData,
    startExercise,
    saveExercise,
    discardExercise,
  };
};
