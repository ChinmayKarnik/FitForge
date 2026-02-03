import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { databaseController } from '../data';
import { useWorkoutTimer, useWorkoutState, useActiveExercise } from '../hooks';
import { ExercisePickerModal } from './ExercisePickerModal';
import { ExerciseFormModal } from './ExerciseFormModal';
import { Exercise } from '../data/types';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';
import white_plus from '../images/white-plus.png'
import white_donut from '../images/white-donut.png'

type Props = {
  onEndWorkout: () => void;
};

export const ActiveWorkoutTracker = ({ onEndWorkout, onBackPress }) => {

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

  const exercises = databaseController.getAllExercises();

  const handleSelectExercise = (exercise: Exercise) => {
    startExercise(exercise);
    setShowExercisePicker(false);
  };

  const handleStopExercise = () => {
    setShowExerciseForm(true);
  };

  const handleSaveExercise = () => {
    saveExercise();
    setShowExerciseForm(false);
  };

  const handleDiscardExercise = () => {
    discardExercise();
    setShowExerciseForm(false);
  };

  const handleEndWorkout = () => {
    const finalWorkout = endWorkout();
    console.log('Final workout:', finalWorkout);
    onEndWorkout();
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
    <View style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#1c2238',
    }}>

      <View style={{
        width: '100%', borderBottomWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12)
      }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: normalizeHeight(46), left: normalizeWidth(16),
          }}
          onPress={onBackPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image style={{

            width: normalizeWidth(9),
            height: normalizeWidth(9) * (86.0 / 51.0),
            aspectRatio: (51.0 / 86.0),
            resizeMode: 'stretch'
          }}
            source={white_left_arrow}
          >

          </Image>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            letterSpacing: 1,
            fontWeight: '700',
            color: "#fefefe"
          }}
        >Active Workout</Text>



      </View>
      {activeExercise ? (<></>) :
        (
          <>
            <View style={{
              borderWidth: normalize(2),
              borderColor: '#4b5171',
              borderRadius: normalize(12),
              marginHorizontal: normalizeWidth(30),
              marginTop: normalizeHeight(40),
            }}>
              <View style={{
                backgroundColor: '#282e4e',
                borderTopLeftRadius: normalize(12),
                borderTopRightRadius: normalize(12),
                width: '100%',
                alignItems: 'center'
              }}>
                <View style={{
                  position: 'absolute',
                  right: normalizeWidth(15),
                  top: normalizeHeight(18),
                  paddingHorizontal: normalizeWidth(5),
                  paddingVertical: normalizeHeight(4),
                  backgroundColor: '#4ba15c',
                  borderRadius: normalize(8),
                  borderWidth: normalize(1),
                  borderColor: '#b0dbb5'
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      backgroundColor: 'white',
                      width: normalizeWidth(5),
                      height: normalizeHeight(5),
                      borderRadius: normalize(20),
                    }}></View>
                    <Text style={{
                      marginLeft: normalizeWidth(4),
                      fontSize: normalize(10),
                      fontWeight: '600',
                      letterSpacing: normalize(0.5),
                      color: '#FFFFFF',
                    }}>LIVE</Text>
                  </View>
                </View>
                <Text style={{
                  paddingTop: normalizeHeight(12),
                  fontSize: normalize(30),
                  fontWeight: '600',
                  letterSpacing: normalize(1),
                  lineHeight: normalizeHeight(52),
                  color: '#f2f1f4',
                }}>{formatTime(elapsedTime)}</Text>

              </View>

              <View style={{
                alignItems: 'center',
                borderTopWidth: normalize(1),
                borderColor: '#2b304b',
                backgroundColor: 'rgb(30, 35, 52)a',
                borderBottomLeftRadius: normalize(12),
                borderBottomRightRadius: normalize(12)
              }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '500',
                    lineHeight: normalize(18),
                    color: '#818398',
                    paddingVertical: normalizeHeight(8),
                  }}
                >Elapsed Time</Text>
              </View>
            </View>

            <View style={{
              borderRadius: normalize(8),
              borderColor: '#485172',
              backgroundColor: '#262d51',
              borderWidth: normalize(1),
              marginTop: normalizeHeight(35),
              marginHorizontal: normalizeWidth(16),
              paddingHorizontal: normalizeWidth(16),
              paddingVertical: normalizeHeight(12)
            }}>
              <TouchableOpacity style={{
                alignItems: 'center',
                paddingVertical: normalizeHeight(12),
                borderWidth: normalize(1),
                borderColor: '#4e68a6',
                backgroundColor: '#2f4880',
                borderRadius: normalize(12),
                flexDirection: 'row',
                justifyContent: 'center',
              }}
                onPress={() => setShowExercisePicker(true)}
              >
                <Image
                  source={white_plus}
                  style={{
                    height: normalizeHeight(12),
                    width: (112.0 / 115.0) * normalize(12),
                    aspectRatio: (115.0 / 112.0),
                    marginRight: normalizeWidth(6)
                  }}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontWeight: '500',
                    lineHeight: normalize(20),
                    color: '#FFFFFF',
                  }}
                >Start Exercise</Text>
              </TouchableOpacity>


              <TouchableOpacity style={{
                alignItems: 'center',
                paddingVertical: normalizeHeight(12),
                borderWidth: normalize(1),
                borderColor: '#dc6c72',
                backgroundColor: '#ad2126',
                borderRadius: normalize(12),
                marginTop: normalize(12),
                flexDirection: 'row',
                justifyContent: 'center',
              }}
                onPress={handleEndWorkout}
              >
                <Image
                  source={white_donut}
                  style={{
                    height: normalizeHeight(12),
                    width: (138.0 / 140.0) * normalize(12),
                    aspectRatio: (140.0 / 138.0),
                    marginRight: normalizeWidth(6)
                  }}
                />
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontWeight: '500',
                    lineHeight: normalize(20),
                    color: '#FFFFFF',
                  }}
                >End Workout </Text>
              </TouchableOpacity>
            </View>
          </>
        )}


      <ExercisePickerModal
        visible={showExercisePicker}
        exercises={exercises}
        onSelectExercise={handleSelectExercise}
        onClose={() => setShowExercisePicker(false)}
      />

      <ExerciseFormModal
        visible={showExerciseForm}
        exercise={activeExercise}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSaveExercise}
        onDiscard={handleDiscardExercise}
        onClose={() => setShowExerciseForm(false)}
      />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 60,
  },
  instructionText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  startExerciseButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  startExerciseButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  stopButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  endButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 40,
  },
  endButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
