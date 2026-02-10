// Dummy routines (plain JS, no TypeScript)
export const routines = [
  {
    id: '1',
    name: 'Push Day',
    exercises: [
      { id: '1', name: 'Weighted Push-ups', sets: 4, reps: 10, rest: 90, 
        notes: "Don't go to failure.  Try to pick a weight so that you can complete all sets with reps"
       },
      { id: '2', name: 'Pulsating Squats', sets: 3, rest: 60 },
    ],
    createdAt : Date.now()
  },
  {
    id: '2',
    name: 'Pull Day',
    exercises: [
      { id: '3', name: 'Pull-ups', sets: 4, reps: 8, rest: 120 },
      { id: '4', name: 'Barbell Row', sets: 3, reps: 10, rest: 90 },
    ],
    createdAt : Date.now()
  },
  {
    id: '3',
    name: 'Leg Day',
    exercises: [
      { id: '5', name: 'Squats', sets: 5, reps: 8, rest: 120 },
      { id: '6', name: 'Lunges', sets: 3, reps: 12, rest: 60 },
    ],
    createdAt : Date.now()
  },
  {
    id: '4',
    name: 'Full Body',
    exercises: [
      { id: '1', name: 'Weighted Push-ups', sets: 3, reps: 10, rest: 90 },
      { id: '3', name: 'Pull-ups', sets: 3, reps: 8, rest: 120 },
      { id: '5', name: 'Squats', sets: 3, reps: 10, rest: 120 },
    ],
    createdAt : Date.now()
  },
];

