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
import ExerciseForm from './ExerciseForm';
import EndActiveWorkoutModal from './EndActiveWorkoutModal';

type Props = {
  onEndWorkout: () => void;
};

export const ActiveWorkoutTracker = ({ onEndWorkout, onBackPress, navigation }) => {

  const { startTime, elapsedTime, formatTime } = useWorkoutTimer();
  const { workout, addExercise, endWorkout } = useWorkoutState(startTime);
  const {
    activeExercise,
    formData,
    setFormData,
    startExercise,
    saveExercise,
    discardExercise,
  } = useActiveExercise(addExercise);

  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

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
        <TimerComponent formatTime={formatTime} elapsedTime={elapsedTime} />
        <View style={styles.exerciseInfoContainer}>
          <Text
            style={styles.currentlyPerformingText}
          >{"Currently Performing:"}</Text>
          <Text
            style={styles.exerciseNameText}
          >{activeExercise.name}</Text>
        </View>

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

      </>) :
        (
          <>
            <TimerComponent formatTime={formatTime} elapsedTime={elapsedTime} />
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
              
            }
          </>
        )}
      


      <ExercisePickerModal
        visible={showExercisePicker}
        exercises={exercises}
        onSelectExercise={handleSelectExercise}
        onClose={() => setShowExercisePicker(false)}
      />

      {/* <ExerciseFormModal
        visible={showExerciseForm}
        exercise={activeExercise}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSaveExercise}
        onDiscard={handleDiscardExercise}
        onClose={() => setShowExerciseForm(false)}
      /> */}

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
    fontSize: normalize(28),
    fontWeight: '600',
    lineHeight: normalize(34),
    letterSpacing: normalize(0.3),
    color: '#F2F4F8',
    marginTop: normalizeHeight(10),
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
});
