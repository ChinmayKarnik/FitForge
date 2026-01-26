import { Workout } from '../types';

export const dummyWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Push Day',
    date: new Date('2026-01-20'),
    exercises: [
      {
        exerciseId: '1',
        sets: [
          { reps: 8, weight: 135 },
          { reps: 8, weight: 135 },
          { reps: 6, weight: 155 },
        ],
      },
      {
        exerciseId: '5',
        sets: [
          { reps: 10, weight: 95 },
          { reps: 8, weight: 95 },
          { reps: 8, weight: 95 },
        ],
      },
    ],
    duration: 45,
    notes: 'Felt strong today',
  },
  {
    id: '2',
    name: 'Leg Day',
    date: new Date('2026-01-22'),
    exercises: [
      {
        exerciseId: '2',
        sets: [
          { reps: 10, weight: 185 },
          { reps: 8, weight: 205 },
          { reps: 6, weight: 225 },
        ],
      },
      {
        exerciseId: '3',
        sets: [
          { reps: 5, weight: 275 },
          { reps: 5, weight: 275 },
          { reps: 5, weight: 275 },
        ],
      },
    ],
    duration: 60,
  },
];
