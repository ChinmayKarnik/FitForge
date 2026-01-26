import { Exercise } from '../types';

export const dummyExercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    description: 'A compound exercise that works the chest, shoulders, and triceps',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'Barbell',
  },
  {
    id: '2',
    name: 'Squat',
    description: 'A compound exercise that works the legs and core',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    equipment: 'Barbell',
  },
  {
    id: '3',
    name: 'Deadlift',
    description: 'A compound exercise that works the entire posterior chain',
    muscleGroups: ['Back', 'Hamstrings', 'Glutes', 'Core'],
    equipment: 'Barbell',
  },
  {
    id: '4',
    name: 'Pull-ups',
    description: 'An upper body exercise that works the back and biceps',
    muscleGroups: ['Back', 'Biceps'],
    equipment: 'Pull-up Bar',
  },
  {
    id: '5',
    name: 'Overhead Press',
    description: 'A compound exercise that works the shoulders and triceps',
    muscleGroups: ['Shoulders', 'Triceps', 'Core'],
    equipment: 'Barbell',
  },
];
