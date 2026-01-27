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
];
