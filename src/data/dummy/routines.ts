export const routines = [
  {
    id: '1',
    name: 'Push Day',
    exercises: [
      { id: '2',  name: 'Bench Press',        sets: 4, reps: 8,  rest: 120 },
      { id: '9',  name: 'Incline Bench Press', sets: 3, reps: 10, rest: 90  },
      { id: '16', name: 'Overhead Press',      sets: 3, reps: 10, rest: 90  },
      { id: '23', name: 'Tricep Pushdown',     sets: 3, reps: 12, rest: 60  },
    ],
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Pull Day',
    exercises: [
      { id: '1',  name: 'Barbell Row',     sets: 4, reps: 8,  rest: 120 },
      { id: '10', name: 'Lat Pulldown',    sets: 3, reps: 10, rest: 90  },
      { id: '3',  name: 'Bicep Curls',     sets: 3, reps: 12, rest: 60  },
    ],
    createdAt: Date.now(),
  },
  {
    id: '3',
    name: 'Leg Day',
    exercises: [
      { id: '22', name: 'Squat',     sets: 4, reps: 8,  rest: 120 },
      { id: '14', name: 'Leg Press', sets: 3, reps: 10, rest: 90  },
      { id: '12', name: 'Leg Curl',  sets: 3, reps: 12, rest: 60  },
    ],
    createdAt: Date.now(),
  },
];
