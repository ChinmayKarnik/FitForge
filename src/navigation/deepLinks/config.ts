import { LinkingOptions } from '@react-navigation/native';

export const SCHEME = 'fitforge';
export const PREFIXES = [`${SCHEME}://`, 'https://fitforge.chinmaykarnik.com'];

export const linkingConfig: LinkingOptions<any> = {
  prefixes: PREFIXES,
  config: {
    screens: {
      MainTabs: {
        path: '',
        screens: {
          // fitforge:// → Activity tab (home)
          Activity: '',
          // Future entries:
          // TrackWorkout: 'track',
        },
      },
      // Future entries:
      // WorkoutDetails: 'workout/:workoutId',
    },
  },
};
