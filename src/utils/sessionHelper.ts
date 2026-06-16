// Session-wide state that lives for the duration of the app runtime.
// Not persisted — cleared on app restart.

let _isWorkoutActive = false;

export const sessionHelper = {
  setWorkoutActive: (value: boolean) => { _isWorkoutActive = value; },
  isWorkoutActive: () => _isWorkoutActive,
};
