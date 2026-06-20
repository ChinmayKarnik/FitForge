import { Exercise } from '../types';

export const dummyExercises: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Row',
    description: 'A compound pulling exercise that targets the mid and upper back',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '2',
    name: 'Bench Press',
    description: 'A compound pushing exercise that targets the chest, shoulders, and triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '3',
    name: 'Bicep Curls',
    description: 'An isolation exercise targeting the biceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '4',
    name: 'Calf Raises',
    description: 'An isolation exercise targeting the calf muscles',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '5',
    name: 'Deadlift',
    description: 'A compound pull that works the entire posterior chain — back, glutes, and hamstrings',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '6',
    name: 'Decline Bench Press',
    description: 'A compound pushing exercise emphasising the lower chest',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '7',
    name: 'Dips',
    description: 'A bodyweight exercise targeting the chest and triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '8',
    name: 'Hammer Curls',
    description: 'A curl variation targeting the biceps and brachialis with a neutral grip',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '9',
    name: 'Incline Bench Press',
    description: 'A compound pushing exercise emphasising the upper chest',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '10',
    name: 'Lat Pulldown',
    description: 'A cable machine exercise that targets the lats and upper back',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '11',
    name: 'Lateral Raises',
    description: 'An isolation exercise targeting the lateral deltoids',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '12',
    name: 'Leg Curl',
    description: 'An isolation exercise targeting the hamstrings',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '13',
    name: 'Leg Extension',
    description: 'An isolation exercise targeting the quadriceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '14',
    name: 'Leg Press',
    description: 'A machine exercise targeting the quads, hamstrings, and glutes',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '15',
    name: 'Lunges',
    description: 'A unilateral leg exercise that targets the quads, glutes, and hamstrings',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '16',
    name: 'Overhead Press',
    description: 'A compound pressing movement targeting the shoulders and triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '17',
    name: 'Plank',
    description: 'A core stability exercise that engages the abs, back, and shoulders',
    requiredParameters: [
      { name: 'Time', type: 'time', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '18',
    name: 'Pull-ups',
    description: 'A bodyweight exercise targeting the lats, upper back, and biceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '19',
    name: 'Push-ups',
    description: 'A bodyweight exercise targeting the chest, shoulders, and triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '20',
    name: 'Seated Cable Row',
    description: 'A cable exercise targeting the mid back, lats, and biceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '21',
    name: 'Skull Crushers',
    description: 'A barbell isolation exercise targeting the triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '22',
    name: 'Squat',
    description: 'A fundamental compound exercise targeting the quads, glutes, and hamstrings',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '23',
    name: 'Tricep Pushdown',
    description: 'A cable isolation exercise targeting the triceps',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '24',
    name: 'Weighted Pull-ups',
    description: 'Pull-ups performed with a weight belt or vest for added resistance',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
  {
    id: '25',
    name: 'Weighted Push-ups',
    description: 'Push-ups performed with added weight on the back for increased resistance',
    requiredParameters: [
      { name: 'Reps', type: 'reps', moreIsBetter: true },
      { name: 'Weight', type: 'weight', moreIsBetter: true },
    ],
    optionalParameters: [],
  },
];
