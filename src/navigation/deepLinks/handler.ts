import { NavigationContainerRef } from '@react-navigation/native';
import { PREFIXES } from './config';

/**
 * Central entry point for all deep link routing logic.
 *
 * React Navigation's `linkingConfig` handles simple static URL → screen
 * mappings automatically. This handler is for cases that require context
 * at runtime — e.g. "is this my workout or someone else's?" — which
 * can't be expressed as a declarative config.
 *
 * Called on every incoming deep link event (app already open, or resumed
 * from background). Cold-start links are handled by `linkingConfig` alone.
 */
export function resolveDeepLink(
  url: string,
  navigationRef: React.RefObject<NavigationContainerRef<any>>,
): void {
  if (!navigationRef.current) return;

  const path = stripPrefix(url);

  // fitforge:// — no path, go home
  if (path === '' || path === '/') {
    navigationRef.current.navigate('MainTabs' as never);
    return;
  }

  // --- Future routes ---
  //
  // const workoutMatch = path.match(/^workout\/(.+)$/);
  // if (workoutMatch) {
  //   const workoutId = workoutMatch[1];
  //   const workout = databaseController.getWorkoutById(workoutId);
  //   const isOwner = workout?.userId === databaseController.getUserInfo()?.id;
  //   if (isOwner && workout) {
  //     navigationRef.current.navigate('WorkoutDetails', { workout });
  //   } else {
  //     navigationRef.current.navigate('MainTabs', { screen: 'TrackWorkout' });
  //   }
  //   return;
  // }
}

function stripPrefix(url: string): string {
  for (const prefix of PREFIXES) {
    if (url.startsWith(prefix)) return url.slice(prefix.length);
  }
  return url;
}
