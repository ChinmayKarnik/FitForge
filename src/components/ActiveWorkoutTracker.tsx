import React, { useState, useEffect, act } from 'react';
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { databaseController } from '../data';
import { useWorkoutTimer, useWorkoutState, useActiveExercise } from '../hooks';
import { ExercisePickerModal } from './ExercisePickerModal';
import { ExerciseFormModal } from './ExerciseFormModal';
import { TimerComponent } from './TimerComponent';
import { Exercise } from '../data/types';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import white_plus from '../images/white-plus.png'
import white_donut from '../images/white-donut.png'
import white_cross from '../images/cross-icon-white.png'
import weight_with_lightning from '../images/weight-with-lightning.png';
import circular_play_icon from '../images/circular-play-icon.png';
import push_person from '../images/push-person.png';
import ExerciseForm from './ExerciseForm';
import EndActiveWorkoutModal from './EndActiveWorkoutModal';
import CurrentWorkoutList from './CurrentWorkoutList';

const ActiveExerciseInfo = ({ exerciseName, exerciseStartTime, workoutStartTime, elapsedTime }: any) => {
  const exerciseElapsed = elapsedTime - ((exerciseStartTime || 0) - (workoutStartTime || 0));

  const formatExerciseTime = (ms: number) => {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.exerciseInfoCard}>

      <View style={styles.iconWithLinesRow}>
        <View style={styles.iconFlankLine} />
        <View style={styles.exerciseIconCircle}>
          <Image
            source={push_person}
            style={styles.exerciseIconImage}
          />
        </View>
        <View style={styles.iconFlankLine} />
      </View>

      <View style={styles.currentExercisePill}>
        <Text style={styles.currentExercisePillText}>CURRENT EXERCISE</Text>
      </View>

      <Text style={styles.exerciseNameText}>{exerciseName}</Text>

      <View style={styles.nameDivider} />

      <Text style={styles.instructionText}>
        Go smash that set! Come back here and tap Finish Exercise when done.
      </Text>

      <View style={styles.exerciseTimerBox}>
        <Text style={styles.exerciseTimerLabel}>THIS EXERCISE</Text>
        <Text style={styles.exerciseTimerValue}>{formatExerciseTime(exerciseElapsed)}</Text>
      </View>

    </View>
  );
};

const PreStartWorkoutUI = ({ onStartWorkout }: any) => {
  return (
    <View style={styles.preStartContainer}>
      <Image
        source={weight_with_lightning}
        style={styles.preStartMainIcon}
      />
      <Text style={styles.preStartTitle}>
        Ready to Forge your Strength?
      </Text>
      <Text style={styles.preStartSubtitle}>
        Prepare to begin your session and achieve your goals.
      </Text>
      <TouchableOpacity
        style={styles.preStartButton}
        onPress={onStartWorkout}
      >
        <Text style={styles.preStartButtonText}>Start Workout</Text>
        <Image
          source={circular_play_icon}
          style={styles.preStartButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  onEndWorkout: () => void;
};

export const ActiveWorkoutTracker = ({ onEndWorkout, onBackPress, navigation }) => {

  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const { startTime, elapsedTime, formatTime } = useWorkoutTimer(isTimerStarted);
  const { workout, addExercise, endWorkout } = useWorkoutState(startTime || 0);
  const {
    activeExercise,
    formData,
    setFormData,
    startExercise,
    saveExercise,
    discardExercise,
  } = useActiveExercise(addExercise);

  const exercises = databaseController.getAllExercises();;

  const handleSelectExercise = (exercise: Exercise) => {
    startExercise(exercise);
    setShowExercisePicker(false);
  };

  const handleStopExercise = () => {
    setShowExerciseForm(true)
  };

  const handleSaveExercise = () => {
    saveExercise();
    setShowExerciseForm(false);
  };

  const handleDiscardExercise = () => {
    discardExercise();
    setShowExerciseForm(false);
  };

  const onCloseExerciseForm = ()=>{
    setShowExerciseForm(false)
  }

  const handleEndWorkout = () => {
    endWorkout()
    setShowEndModal(true);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onBackPress) {
        onBackPress();
        return true; // Prevent other back handlers from running
      }
      return true;
    });
    return () => backHandler.remove();
  }, [onBackPress]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image style={styles.backButtonImage}
            source={white_left_arrow}
          >

          </Image>
        </TouchableOpacity>
        <Text
          style={styles.headerText}
        >Active Workout</Text>



      </View>
      {activeExercise ? (<>
        <TimerComponent formatTime={formatTime} elapsedTime={elapsedTime} showLive={isTimerStarted} />
        <ActiveExerciseInfo
          exerciseName={activeExercise.name}
          exerciseStartTime={activeExercise.startTime}
          workoutStartTime={startTime}
          elapsedTime={elapsedTime}
        />

        {
          showExerciseForm ? (<>
            <ExerciseForm 
            exerciseName ={activeExercise.name}
            onCloseForm = {onCloseExerciseForm}
            exerciseId = {activeExercise.id}
            onFormDataChange = {setFormData}
            onSave ={handleSaveExercise}
            onDiscard = {handleDiscardExercise}
            />
          </>) : (
            <>
              <TouchableOpacity style={styles.finishExerciseButton}
                onPress={() => handleStopExercise()}
              >
                <Image
                  source={white_donut}
                  style={styles.buttonImage}
                />
                <Text
                  style={styles.buttonText}
                >Finish Exercise</Text>
              </TouchableOpacity>
            </>
          )
        }



        <TouchableOpacity style={styles.endWorkoutButton2}
          onPress={handleEndWorkout}
        >
          <Image
            source={white_donut}
            style={styles.buttonImage}
          />
          <Text
            style={styles.buttonText}
          >End Workout   </Text>
        </TouchableOpacity>

        {!showExerciseForm && (
          <TouchableOpacity
            style={styles.discardExerciseLink}
            onPress={handleDiscardExercise}
            hitSlop={{ top: 12, bottom: 12, left: 20, right: 20 }}
          >
            <Text style={styles.discardExerciseLinkText}>Wrong exercise? Discard</Text>
          </TouchableOpacity>
        )}

      </>) :
        (
          <>
            <TimerComponent formatTime={formatTime} elapsedTime={elapsedTime} showLive={isTimerStarted} />
            {isTimerStarted ? (
              <>
                <View style={styles.noActiveExerciseContainer}>
                  <TouchableOpacity style={styles.startExerciseButton}
                    onPress={() => setShowExercisePicker(true)}
                  >
                    <Image
                      source={white_plus}
                      style={styles.startExerciseImage}
                    />
                    <Text
                      style={styles.buttonText}
                    >Start Exercise</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.endWorkoutButton}
                    onPress={handleEndWorkout}
                  >
                    <Image
                      source={white_donut}
                      style={styles.buttonImage}
                    />
                    <Text
                      style={styles.buttonText}
                    >End Workout </Text>
                  </TouchableOpacity>
                </View>
                {
                  <CurrentWorkoutList workout={workout}/>
                }
              </>
            ) : (
              <PreStartWorkoutUI onStartWorkout={() => setIsTimerStarted(true)} />
            )}
          </>
        )}
      


      <ExercisePickerModal
        visible={showExercisePicker}
        exercises={exercises}
        onSelectExercise={handleSelectExercise}
        onClose={() => setShowExercisePicker(false)}
      />

      <EndActiveWorkoutModal
        workout={workout}
        visible={showEndModal}
        onClose={() => setShowEndModal(false)}
        navigation={navigation}
      />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1c2238',
  },
  header: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(68, 75, 95)',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 42, 65)',
    paddingTop: normalizeHeight(40),
    paddingBottom: normalizeHeight(12),
  },
  backButton: {
    position: 'absolute',
    top: normalizeHeight(46),
    left: normalizeWidth(16),
  },
  backButtonImage: {
    width: normalizeWidth(9),
    height: normalizeWidth(9) * (86.0 / 51.0),
    aspectRatio: (51.0 / 86.0),
    resizeMode: 'stretch',
  },
  headerText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  exerciseInfoContainer: {
    marginTop: normalizeHeight(30),
    alignItems: 'center',
    marginBottom: normalize(40),
  },
  currentlyPerformingText: {
    fontSize: normalize(18),
    fontWeight: '500',
    lineHeight: normalize(20),
    letterSpacing: normalize(0.2),
    color: '#A9B1C2',
  },
  exerciseNameText: {
    fontSize: normalize(26),
    fontWeight: '700',
    lineHeight: normalize(32),
    letterSpacing: normalize(0.2),
    color: '#F2F4F8',
    textAlign: 'center',
  },
  finishExerciseButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    backgroundColor: '#2f4880',
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endWorkoutButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderWidth: normalize(1),
    borderColor: '#dc6c72',
    backgroundColor: '#ad2126',
    borderRadius: normalize(12),
    marginTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endWorkoutButton2: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#dc6c72',
    backgroundColor: '#ad2126',
    borderRadius: normalize(12),
    marginTop: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonImage: {
    height: normalizeHeight(12),
    width: (138.0 / 140.0) * normalize(12),
    aspectRatio: (140.0 / 138.0),
    marginRight: normalizeWidth(6),
  },
  buttonText: {
    fontSize: normalize(16),
    fontWeight: '500',
    lineHeight: normalize(20),
    color: '#FFFFFF',
  },
  noActiveExerciseContainer: {
    borderRadius: normalize(8),
    borderColor: '#485172',
    backgroundColor: '#262d51',
    borderWidth: normalize(1),
    marginTop: normalizeHeight(35),
    marginHorizontal: normalizeWidth(16),
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(12),
  },
  startExerciseButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderWidth: normalize(1),
    borderColor: '#4e68a6',
    backgroundColor: '#2f4880',
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startExerciseImage: {
    height: normalizeHeight(12),
    width: (112.0 / 115.0) * normalize(12),
    aspectRatio: (115.0 / 112.0),
    marginRight: normalizeWidth(6),
  },
  preStartContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(16),
    paddingTop:normalizeHeight(70)
  },
  preStartText: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#F2F4F8',
    textAlign: 'center',
  },
  preStartMainIcon: {
    width: normalizeWidth(100),
    height: normalizeWidth(100),
    aspectRatio: (618.0) / (618.0),
    marginBottom: normalizeHeight(32),
    resizeMode: 'contain',
  },
  preStartTitle: {
    fontSize: normalize(28),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: normalizeHeight(10),
    letterSpacing: normalize(-0.5),
  },
  preStartSubtitle: {
    fontSize: normalize(16),
    fontWeight: '400',
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: normalize(24),
    marginHorizontal: normalizeWidth(16),
    marginBottom: normalizeHeight(40),
    letterSpacing: normalize(0.1),
  },
  preStartButton: {
    alignItems: 'center',
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(70),
    marginHorizontal: normalizeWidth(12),
    borderWidth: normalize(2),
    borderColor: '#ffffff',
    backgroundColor: '#ab2a2f',
    borderRadius: normalize(14),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  preStartButtonText: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: normalize(0.3),
  },
  preStartButtonIcon: {
    width: normalizeWidth(20),
    aspectRatio: (537.0) / (535.0),
    marginLeft: normalizeWidth(8),
    marginTop:normalizeHeight(3),
    resizeMode: 'contain',
  },
  exerciseInfoCard: {
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(16),
    marginHorizontal: normalizeWidth(16),
    backgroundColor: '#262d51',
    borderWidth: normalize(1),
    borderColor: '#485172',
    borderRadius: normalize(16),
    paddingHorizontal: normalizeWidth(20),
    paddingTop: normalizeHeight(12),
    paddingBottom: normalizeHeight(14),
    alignItems: 'center',
  },
  currentExercisePill: {
    backgroundColor: '#1a2340',
    borderRadius: normalize(20),
    borderWidth: normalize(1),
    borderColor: '#3d5280',
    paddingHorizontal: normalizeWidth(12),
    paddingVertical: normalizeHeight(4),
    marginBottom: normalizeHeight(12),
  },
  currentExercisePillText: {
    color: '#7b92c4',
    fontSize: normalize(11),
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  exerciseIconCircle: {
    width: normalizeWidth(48),
    height: normalizeWidth(48),
    borderRadius: normalizeWidth(24),
    backgroundColor: '#1c2550',
    borderWidth: normalize(1),
    borderColor: '#485172',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalizeWidth(12),
  },
  exerciseIconImage: {
    width: normalizeWidth(30),
    height: normalizeWidth(30) * (287.0 / 332.0),
    aspectRatio: (332.0) / (287.0),
    resizeMode: 'contain',
  },
  iconWithLinesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: normalizeHeight(12),
  },
  iconFlankLine: {
    flex: 1,
    height: normalize(1),
    backgroundColor: '#485172',
  },
  nameDivider: {
    width: '35%',
    alignSelf: 'center',
    height: normalize(1),
    backgroundColor: '#485172',
    marginTop: normalizeHeight(10),
    marginBottom: normalizeHeight(10),
  },
  instructionText: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: '#A9B1C2',
    textAlign: 'center',
    lineHeight: normalize(18),
    paddingHorizontal: normalizeWidth(8),
    marginBottom: normalizeHeight(12),
  },
  exerciseTimerBox: {
    alignSelf: 'stretch',
    backgroundColor: '#1c2238',
    borderWidth: normalize(1),
    borderColor: '#485172',
    borderRadius: normalize(10),
    paddingVertical: normalizeHeight(10),
    alignItems: 'center',
  },
  exerciseTimerLabel: {
    color: '#7b92c4',
    fontSize: normalize(11),
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: normalizeHeight(2),
  },
  exerciseTimerValue: {
    color: '#F2F4F8',
    fontSize: normalize(22),
    fontWeight: '700',
    letterSpacing: normalize(1),
  },
  discardExerciseLink: {
    alignSelf: 'center',
    marginTop: normalizeHeight(18),
  },
  discardExerciseLinkText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: normalize(13),
    fontWeight: '400',
    textAlign: 'center',
  },
});
