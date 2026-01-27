import { Exercise } from '../types';

export const dummyExercises: Exercise[] = [
  {
    id: '1',
    name: 'Weighted Push-ups',
    description: 'A compound exercise that works the chest, shoulders, and triceps',
    requiredParameters: [
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
      { name: 'toFailure', type: 'boolean' },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '2',
    name: 'Pulsating Squats',
    description: 'A compound exercise that works the legs and core',
    requiredParameters: [
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
      { name: 'toFailure', type: 'boolean' },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '3',
    name: 'Pull-ups',
    description: 'An upper body exercise that works the back and biceps',
    requiredParameters: [
      { name: 'reps', type: 'number', moreIsBetter: true, },
      { name: 'toFailure', type: 'boolean' },
    ],
    optionalParameters: [],
  },
  {
    id: '4',
    name: 'Deadlift',
    description: 'A compound exercise that works the entire posterior chain',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '5',
    name: 'Overhead Press',
    description: 'A compound exercise that works the shoulders and triceps',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '6',
    name: 'Barbell Row',
    description: 'A compound exercise targeting the back muscles',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '7',
    name: 'Dips',
    description: 'A bodyweight exercise for chest and triceps',
    requiredParameters: [
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'toFailure', type: 'boolean' },
    ],
    optionalParameters: [
      { name: 'weight', type: 'number', moreIsBetter: true },
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '8',
    name: 'Lunges',
    description: 'A unilateral leg exercise',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'weight', type: 'number', moreIsBetter: true },
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '9',
    name: 'Plank',
    description: 'A core stability exercise',
    requiredParameters: [
      { name: 'duration', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '10',
    name: 'Bicep Curls',
    description: 'An isolation exercise for the biceps',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '11',
    name: 'Tricep Extensions',
    description: 'An isolation exercise for the triceps',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '12',
    name: 'Leg Press',
    description: 'A machine-based leg exercise',
    requiredParameters: [
      { name: 'sets', type: 'number', moreIsBetter: true },
      { name: 'reps', type: 'number', moreIsBetter: true },
      { name: 'weight', type: 'number', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
];
