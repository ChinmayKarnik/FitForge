// Session-wide state that lives for the duration of the app runtime.
// Not persisted — cleared on app restart.

let _isWorkoutActive = false;
let _lastWorkoutToastTime = 0;
const WORKOUT_TOAST_COOLDOWN_MS = 2000;

export const sessionHelper = {
  setWorkoutActive: (value: boolean) => { _isWorkoutActive = value; },
  isWorkoutActive: () => _isWorkoutActive,
  canShowWorkoutToast: () => {
    const now = Date.now();
    if (now - _lastWorkoutToastTime >= WORKOUT_TOAST_COOLDOWN_MS) {
      _lastWorkoutToastTime = now;
      return true;
    }
    return false;
  },
};
