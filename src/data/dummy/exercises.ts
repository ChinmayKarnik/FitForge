import { Exercise } from '../types';

export const dummyExercises = [
  {
    id: '1',
    name: 'Weighted Push-ups',
    description: 'A compound exercise that works the chest, shoulders, and triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
      { name: 'To Failure', type: 'boolean' },
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
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
      { name: 'To Failure', type: 'boolean' },
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
      { name: 'Reps', type: 'reps', moreIsBetter: true, },
      { name: 'To Failure', type: 'boolean' },
    ],
    optionalParameters: [],
  },
  {
    id: '4',
    name: 'Deadlift',
    description: 'A compound exercise that works the entire posterior chain',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
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
    
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
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
    
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
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
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'To Failure', type: 'boolean' },
    ],
    optionalParameters: [
      { name: 'Weight', type:'weight', moreIsBetter: true },
      { name: 'notes', type: 'string' },
    ],
  },
  {
    id: '8',
    name: 'Lunges',
    description: 'A unilateral leg exercise',
    requiredParameters: [
    
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'Weight', type:'weight', moreIsBetter: true },
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
    
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
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
    
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
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
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type:'weight', moreIsBetter: true },
    ],
    optionalParameters: [
      { name: 'notes', type: 'string' },
    ],
  },
];
