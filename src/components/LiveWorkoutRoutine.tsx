

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import white_left_arrow from '../images/white-left-arrow.png';
import { SelectRoutineLive } from './SelectRoutineLive';
import { databaseController } from '../data';
import { sessionHelper } from '../utils/sessionHelper';
import { TimerComponent } from './TimerComponent';
import { normalize, normalizeF, normalizeHeight, normalizeWidth, normalizeWidthF } from '../utils/normalize';
import white_plus from '../images/white-plus.png';
import white_donut from '../images/white-donut.png';
import muscle_white from '../images/muscle-white.png';
import dumbbell_horizontal from '../images/dumbbell-horizontal-2.png';
import white_tick from '../images/white-tick.png';
import trend_arrow from '../images/trend-arrow.png';
import slant_dumbbell from '../images/slant-dumbbell-2.png';
import clock_3 from '../images/clock-3.png';
import white_right_arrow from '../images/white-right-arrow.png';
import ExerciseForm from './ExerciseForm';
import EndActiveWorkoutModal from './EndActiveWorkoutModal';
import ActiveExerciseInfo from './ActiveExerciseInfo';
import WorkoutSummaryModal from './WorkoutSummaryModal';
import AreYouSureModal from './AreYouSureModal';

const WorkoutCompleteCard = ({
  exercisesCompleted,
  totalSeconds,
  workout,
}: {
  exercisesCompleted: number;
  totalSeconds: number;
  workout: any;
}) => {
  const [summaryVisible, setSummaryVisible] = useState(false);
  const ringSize = normalizeWidth(87);
  const strokeWidth = normalizeWidthF(12, 2);

  const formatTotal = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <View style={completedStyles.card}>
      {/* Ring + tick */}
      <View style={completedStyles.ringWrapper}>
        <View style={{
          width: ringSize, height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: strokeWidth,
          borderColor: '#6d8eff',
          backgroundColor: '#1c2238',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Image
            source={white_tick}
            style={{ width: normalizeWidth(32), height: normalizeWidth(32) * (283.0 / 383.0), resizeMode: 'contain', tintColor: '#6d8eff' }}
          />
        </View>
      </View>

      {/* Title + subtitle */}
      <Text style={completedStyles.title}>Workout Complete!</Text>
      <Text style={completedStyles.subtitle}>You showed up and put in the work.{'\n'}Great job today.</Text>

      {/* Stats row */}
      <View style={completedStyles.statsDivider} />
      <View style={completedStyles.statsRow}>
        <View style={completedStyles.statBox}>
          {/* Placeholder icon */}
          <View style={completedStyles.statIconBoxExercises}>
            <Image source={slant_dumbbell} style={{ width: normalizeWidth(17), height: normalizeWidth(17) * (411.0 / 547.0), resizeMode: 'contain', tintColor: '#ad85ff' }} />
          </View>
          <Text style={completedStyles.statLabel}>EXERCISES COMPLETED</Text>
          <Text style={completedStyles.statValue}>{exercisesCompleted}</Text>
        </View>
        <View style={completedStyles.statsVerticalDivider} />
        <View style={completedStyles.statBox}>
          {/* Placeholder icon */}
          <View style={completedStyles.statIconBoxTime}>
            <Image source={clock_3} style={{ width: normalizeWidth(13), height: normalizeWidth(13) * (492.0 / 434.0), resizeMode: 'contain', tintColor: '#688efe' }} />
          </View>
          <Text style={completedStyles.statLabel}>TOTAL TIME</Text>
          <Text style={completedStyles.statValue}>{formatTotal(totalSeconds)}</Text>
        </View>
      </View>

      {/* View Workout Summary */}
      <View style={completedStyles.summaryContainer}>
        <TouchableOpacity style={completedStyles.summaryRow} onPress={() => setSummaryVisible(true)}>
          <Image source={trend_arrow} style={{ width: normalizeWidth(20), aspectRatio: 538.0 / 290.0, resizeMode: 'contain', tintColor: '#628ef6' }} />
          <Text style={completedStyles.summaryText}>View Workout Summary</Text>
          <Image source={white_right_arrow} style={{ width: normalizeWidth(6), height: normalizeWidth(6) * (87.0 / 52.0), resizeMode: 'contain', tintColor: '#628ef6' }} />
        </TouchableOpacity>
      </View>
      <WorkoutSummaryModal visible={summaryVisible} onClose={() => setSummaryVisible(false)} workout={workout} />
    </View>
  );
};

const CircularRing = ({
  fillFraction,
  size,
  strokeWidth,
  progressColor,
  innerBgColor,
  children,
}: {
  fillFraction: number;
  size: number;
  strokeWidth: number;
  progressColor: string;
  innerBgColor: string;
  children?: React.ReactNode;
}) => {
  const clamped = Math.min(1, Math.max(0, fillFraction));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped);
  const center = size / 2;
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* Track */}
        <Circle
          cx={center} cy={center} r={radius}
          stroke="#2a3050" strokeWidth={strokeWidth} fill="none"
        />
        {/* Progress arc */}
        <Circle
          cx={center} cy={center} r={radius}
          stroke={progressColor} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{
        position: 'absolute', top: strokeWidth, left: strokeWidth,
        width: innerSize, height: innerSize, borderRadius: innerSize / 2,
        backgroundColor: innerBgColor, alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </View>
    </View>
  );
};

const BeforeFirstSetCard = ({
  nextExercise,
  routineName,
  totalSets,
}: {
  nextExercise: any;
  routineName: string;
  totalSets: number;
}) => {
  return (
    <View style={[restStyles.card]}>
      <View style={restStyles.headerRow}>
        <View style={restStyles.routineIconBox}>
          <Image
            source={muscle_white}
            style={{ width: normalizeWidth(22), height: normalizeWidth(22) * (574 / 495), resizeMode: 'contain', tintColor: '#84bef4' }}
          />
        </View>
        <View style={restStyles.headerTextGroup}>
          <Text style={restStyles.headerLabel}>ROUTINE NAME</Text>
          <Text style={restStyles.headerRoutineName} numberOfLines={1}>{routineName}</Text>
        </View>
      </View>
      <View style={restStyles.headerDivider} />
      <View style={restStyles.bodyRow}>
        <Image
          source={dumbbell_horizontal}
          style={{ width: normalizeWidth(72), height: normalizeWidth(72) * (449 / 1004), resizeMode: 'contain', marginRight: normalizeWidth(16), tintColor: '#7a89c2' }}
        />
        <View style={restStyles.verticalDivider} />
        <View style={restStyles.infoColumn}>
          <Text style={restStyles.upNextLabel}>FIRST UP</Text>
          <Text style={restStyles.exerciseNameText} numberOfLines={2}>{nextExercise?.name ?? '—'}</Text>
          <View style={restStyles.setPill}>
            <Text style={restStyles.setPillText}>Set 1 of {totalSets}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const RestTimeUI = ({
  nextExercise,
  nextExerciseTimestamp,
  totalRestSeconds,
  routineName,
  nextSetNumber,
  totalSets,
}: {
  nextExercise: any;
  nextExerciseTimestamp: number;
  totalRestSeconds: number;
  routineName: string;
  nextSetNumber: number;
  totalSets: number;
}) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setNow(Date.now());
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const remainingMs = nextExerciseTimestamp - now;
  const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const isRestOver = remainingMs <= 0;
  const fillFraction = totalRestSeconds > 0 ? Math.max(0, remainingMs) / (totalRestSeconds * 1000) : 0;
  const ringSize = normalizeWidth(95);
  const strokeWidth = normalizeWidthF(13,2);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={restStyles.card}>
      <View style={restStyles.headerRow}>
        <View style={restStyles.routineIconBox}>
          <Image
            source={muscle_white}
            style={{ width: normalizeWidth(22), height: normalizeWidth(22) * (574 / 495), resizeMode: 'contain', tintColor: '#84bef4' }}
          />
        </View>
        <View style={restStyles.headerTextGroup}>
          <Text style={restStyles.headerLabel}>ROUTINE NAME</Text>
          <Text style={restStyles.headerRoutineName} numberOfLines={1}>{routineName}</Text>
        </View>
      </View>
      <View style={restStyles.headerDivider} />
      <View style={restStyles.bodyRow}>
        <View style={restStyles.ringColumn}>
          {isRestOver ? (
            <View style={{
              width: ringSize, height: ringSize,
              borderRadius: ringSize / 2,
              borderWidth: strokeWidth,
              borderColor: '#62a7ff',
              backgroundColor: '#1c2238',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image
                source={white_tick}
                style={{ width: normalizeWidth(37), height: normalizeWidth(37) * (283.0 / 383.0), resizeMode: 'contain', tintColor: '#62a7ff' }}
              />
            </View>
          ) : (
            <CircularRing
              fillFraction={fillFraction}
              size={ringSize}
              strokeWidth={strokeWidth}
              progressColor="#62a7ff"
              innerBgColor="#1c2238"
            >
              <Text style={restStyles.ringLabel}>REST TIME</Text>
              <Text style={restStyles.ringCountdown}>{formatCountdown(remainingSeconds)}</Text>
            </CircularRing>
          )}
          {isRestOver && (
            <>
              <Text style={restStyles.restOverTitle}>REST OVER</Text>
              <Text style={restStyles.restOverSubtitle}>LET'S GO!</Text>
            </>
          )}
        </View>
        <View style={restStyles.verticalDivider} />
        <View style={restStyles.infoColumn}>
          <Text style={restStyles.upNextLabel}>UP NEXT</Text>
          <Text style={restStyles.exerciseNameText} numberOfLines={2}>{nextExercise?.name ?? '—'}</Text>
          <View style={restStyles.setPill}>
            <Text style={restStyles.setPillText}>Set {nextSetNumber} of {totalSets}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const LiveWorkoutRoutine = ({ onEndWorkout, navigation }: { onEndWorkout: () => void; navigation?: any }) => {
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [exerciseParams, setExerciseParams] = useState<Record<string, any>>({});
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const routine = databaseController.getRoutineById(selectedRoutineId);
  const [seconds, setSeconds] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeExercise,setActiveExercise] =useState<any>(null);
  const [activeExerciseStartTime, setActiveExerciseStartTime] = useState<number | null>(null);
  const [isExerciseInProgress,setIsExerciseInProgress] = useState(false);
  const nextExerciseRef = useRef(null);
  const nextExerciseTime = useRef<number | null>(null);
  const restDurationRef = useRef(0);
  const [initialLoadingDone, setInitialLoadingDone] = useState(false);
  const workout = useRef( {
        startTime: null,
        endTime:null,
        exercises: []
      });

  const isInRestTime = !isExerciseInProgress && workout.current.exercises.length > 0 && !!nextExerciseRef.current;

  const handleBackPress = useCallback(() => {
    if (selectedRoutineId) {
      setShowBackConfirm(true);
    } else {
      onEndWorkout();
    }
    return true;
  }, [selectedRoutineId, onEndWorkout]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => unsubscribe.remove();
    }, [handleBackPress])
  );

  const getNthExerciseInRoutine = ( n: number) => {
    const arr = [...routine.exercises];
    let doneExercises = 0;
    for(let i=0;i<arr.length;i++){
      if(doneExercises + arr[i].sets >=n){
        return arr[i];
      }
      doneExercises += arr[i].sets;
    }
    return null;
  }

  const handleSelectRoutine = (routineId: string) => {
    const routine = databaseController.getRoutineById(routineId);
    nextExerciseRef.current = routine.exercises[0];
    nextExerciseTime.current = startTimeRef.current;
    setInitialLoadingDone(true);

    setSelectedRoutineId(routineId);
  };

  useEffect(() => {
    if (selectedRoutineId) {
      sessionHelper.setWorkoutActive(true);
      startTimeRef.current = Date.now();
      workout.current = {
        startTime: startTimeRef.current,
        endTime: startTimeRef.current,
        exercises: []
      }
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [selectedRoutineId]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getminsectime = (milis)=>{
    const totalSec = Math.floor(milis / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const handleEndWorkout = () => {
    sessionHelper.setWorkoutActive(false);
    workout.current.endTime = Date.now();
    workout.current.duration = workout.current.endTime - workout.current.startTime;
    setShowEndModal(true);
  };

  if (!selectedRoutineId) {
    return <SelectRoutineLive onSelectRoutine={handleSelectRoutine} onEndWorkout={onEndWorkout} />;
  }

  const handleStartExercise = () => {
    setIsExerciseInProgress(true);
    setActiveExercise(nextExerciseRef.current);
    nextExerciseRef.current = null;
    setActiveExerciseStartTime(Date.now());
    nextExerciseTime.current = null;
  };

  const handleFinishExercise = (params) => {
   
    const startTime = activeExerciseStartTime;
    const endTime = Date.now();
   
    workout.current = {
      ...workout.current,
      exercises:[
        ...workout.current.exercises,
        {
          exerciseId: activeExercise.id,
          startTime: startTime,
          endTime: endTime,
          loggedData: params
        }
      ],
      endTime: endTime
    };

    nextExerciseRef.current = getNthExerciseInRoutine(workout.current.exercises.length+1);
    const restExercise = getNthExerciseInRoutine(workout.current.exercises.length);
    restDurationRef.current = restExercise?.rest ?? 0;
    nextExerciseTime.current = endTime + restDurationRef.current * 1000;
    if (!nextExerciseRef.current && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
     setIsExerciseInProgress(false);
    setActiveExercise(null);
    setShowFinishModal(false)
     setExerciseParams({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image
            style={styles.backButtonImage}
            source={white_left_arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Live Workout</Text>
      </View>

      <TimerComponent formatTime={formatTime} elapsedTime={seconds} />

      { !isExerciseInProgress && (
        nextExerciseRef.current ? (
          isInRestTime ? (
            <RestTimeUI
              nextExercise={nextExerciseRef.current}
              nextExerciseTimestamp={nextExerciseTime.current ?? 0}
              totalRestSeconds={restDurationRef.current}
              routineName={routine?.name ?? ''}
              nextSetNumber={workout.current.exercises.filter((e: any) => e.exerciseId === (nextExerciseRef.current as any)?.id).length + 1}
              totalSets={(nextExerciseRef.current as any)?.sets ?? 1}
            />
          ) : (
            <BeforeFirstSetCard
              nextExercise={nextExerciseRef.current}
              routineName={routine?.name ?? ''}
              totalSets={(nextExerciseRef.current as any)?.sets ?? 1}
            />
          )
        ) : initialLoadingDone ? (
          <WorkoutCompleteCard
            exercisesCompleted={workout.current.exercises.length}
            totalSeconds={seconds}
            workout={workout.current}
          />
        ) : null
      )}
      {isExerciseInProgress && activeExercise && !showFinishModal && (
        <ActiveExerciseInfo
          exerciseName={activeExercise.name}
          exerciseStartTime={activeExerciseStartTime}
          workoutStartTime={startTimeRef.current}
          elapsedTime={seconds * 1000}
        />
      )}
      
      {!isExerciseInProgress && nextExerciseRef.current && (
        <TouchableOpacity style={styles.startExerciseButton} onPress={handleStartExercise}>
          <Image
            source={white_plus}
            style={styles.startExerciseImage}
          />
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>
      )}
      {isExerciseInProgress && !showFinishModal && (
        <TouchableOpacity style={styles.finishExerciseButton} onPress={() => setShowFinishModal(true)}>
          <Image
            source={white_donut}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Finish Exercise</Text>
        </TouchableOpacity>
      )}
      {showFinishModal && activeExercise && (
        <View style={{ marginTop: normalizeHeight(16) }}>
          <ExerciseForm
            exerciseName={activeExercise.name}
            exerciseId={activeExercise.id}
            onFormDataChange={setExerciseParams}
            onSave={() => {
              handleFinishExercise(exerciseParams);
            }}
            onDiscard={() => {
              setShowFinishModal(false);
              setExerciseParams({});
            }}
            onCloseForm={() => {
              setShowFinishModal(false);
              setExerciseParams({});
            }}
          />
        </View>
      )}
      <TouchableOpacity style={styles.endWorkoutButton} onPress={handleEndWorkout}>
        <Image
          source={white_donut}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>End Workout</Text>
      </TouchableOpacity>
      <EndActiveWorkoutModal
        workout={workout.current}
        visible={showEndModal}
        onClose={() => setShowEndModal(false)}
        onEndWorkout={onEndWorkout}
        navigation={navigation}
      />
      <AreYouSureModal
        visible={showBackConfirm}
        onClose={() => setShowBackConfirm(false)}
        title="Leave Workout?"
        description="Your progress will be lost if you leave now."
        primaryLabel="Leave"
        onPrimary={() => { setShowBackConfirm(false); sessionHelper.setWorkoutActive(false); onEndWorkout(); }}
        primaryVariant="destructive"
        secondaryLabel="Stay"
        onSecondary={() => setShowBackConfirm(false)}
      />
    </View>
  );
};

const restStyles = StyleSheet.create({
  card: {
    marginTop: normalizeHeight(12),
    marginBottom: normalizeHeight(16),
    marginHorizontal: normalizeWidth(30),
    backgroundColor: '#1f243b',
    borderWidth:normalizeF(3,2),
    borderColor: '#3a4060',
    borderRadius: normalize(16),
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(12),
    gap: normalizeWidth(12),
  },
  routineIconBox: {
    width: normalizeWidth(38),
    height: normalizeWidth(38),
    borderRadius: normalize(8),
    backgroundColor: '#2b3656',
    borderWidth: normalize(1),
    borderColor: '#313e5e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
  },
  headerLabel: {
    fontSize: normalize(10),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: normalize(1.2),
  },
  headerRoutineName: {
    fontSize: normalize(17),
    fontWeight: '700',
    color: '#F2F4F8',
    marginTop: normalizeHeight(1),
  },
  headerDivider: {
    height: normalize(1),
    backgroundColor: 'rgba(72, 81, 114, 0.6)',
    marginHorizontal: normalizeWidth(12)
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
  },
  ringColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalizeWidth(16),
  },
  verticalDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(72, 81, 114, 0.6)',
    marginRight: normalizeWidth(16),
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  restOverTitle: {
    fontSize: normalize(17),
    fontWeight: '700',
    color: '#F2F4F8',
    marginTop: normalizeHeight(7),
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  restOverSubtitle: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: '#68bbff',
    marginTop: normalizeHeight(3),
    textAlign: 'center',
    letterSpacing: normalize(0.5),
  },
  ringLabel: {
    fontSize: normalize(9),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: normalize(0.8),
    textAlign: 'center',
  },
  ringCountdown: {
    fontSize: normalize(22),
    fontWeight: '700',
    color: '#F2F4F8',
    letterSpacing: normalize(0.5),
    marginTop: normalizeHeight(2),
  },
  upNextLabel: {
    fontSize: normalize(10),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: normalize(1.2),
    marginBottom: normalizeHeight(6),
  },
  exerciseNameText: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: '#F2F4F8',
    lineHeight: normalize(23),
  },
  setPill: {
    alignSelf: 'flex-start',
    marginTop: normalizeHeight(9),
    paddingHorizontal: normalizeWidth(8),
    paddingVertical: normalizeHeight(3),
    borderRadius: normalize(5),
    borderWidth: 1,
    borderColor: '#354776',
    backgroundColor: '#2a3963',
  },
  setPillText: {
    fontSize: normalize(11),
    fontWeight: '500',
    color: '#bde4fd',
    letterSpacing: normalize(0.5),
  },
});

const styles = StyleSheet.create({
    middleSectionContainer: {
      alignItems: 'center',
      marginVertical: normalizeHeight(16),
    },
    middleExerciseName: {
      fontSize: normalize(32),
      fontWeight: '700',
      color: '#FFFFFF',
      marginTop: normalizeHeight(12),
      marginBottom: normalizeHeight(4),
      letterSpacing: 0.5,
    },
    middleSetNumber: {
      fontSize: normalize(18),
      color: '#A9B1C2',
      marginTop: normalizeHeight(2),
      marginBottom: normalizeHeight(8),
      fontWeight: '400',
      letterSpacing: 0.2,
    },
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
    aspectRatio: 51.0 / 86.0,
    resizeMode: 'stretch',
  },
  headerText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '700',
    color: '#fefefe',
  },
  nextExerciseText: {
    fontSize: normalize(18),
    color: '#A9B1C2',
    marginBottom: normalizeHeight(8),
  },
  countdownText: {
    fontSize: normalize(32),
    color: '#4ECDC4',
    fontWeight: 'bold',
    marginTop: normalizeHeight(8),
  },
  finishedText: {
    fontSize: normalize(20),
    color: '#F2F4F8',
    fontWeight: 'bold',
    marginBottom: normalizeHeight(8),
  },
  startExerciseButton: {
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
    marginHorizontal: normalizeWidth(24),
    borderWidth: normalize(1),
    borderColor: '#dc6c72',
    backgroundColor: '#ad2126',
    borderRadius: normalize(12),
    marginTop: normalize(6),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalizeHeight(32),
  },
  buttonImage: {
    height: normalizeHeight(12),
    width: (138.0 / 140.0) * normalize(12),
    aspectRatio: (140.0 / 138.0),
    marginRight: normalizeWidth(6),
  },
  startExerciseImage: {
    height: normalizeHeight(12),
    width: (112.0 / 115.0) * normalize(12),
    aspectRatio: (115.0 / 112.0),
    marginRight: normalizeWidth(6),
  },
  buttonText: {
    fontSize: normalize(16),
    fontWeight: '500',
    lineHeight: normalize(20),
    color: '#FFFFFF',
  },
});

const completedStyles = StyleSheet.create({
  card: {
    marginTop: normalizeHeight(20),
    marginBottom: normalizeHeight(6),
    marginHorizontal: normalizeWidth(30),
    backgroundColor: '#222944',
    borderWidth: normalizeF(3, 2),
    borderColor: '#3a4060',
    borderRadius: normalize(16),
    overflow: 'hidden',
  },
  ringWrapper: {
    alignItems: 'center',
    marginTop: normalizeHeight(24),
  },
  title: {
    fontSize: normalize(22),
    fontWeight: '700',
    color: '#F2F4F8',
    textAlign: 'center',
    marginTop: normalizeHeight(12),
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: '#919fd4',
    textAlign: 'center',
    marginTop: normalizeHeight(6),
    lineHeight: normalize(19),
    paddingHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(16),
  },
  statsDivider: {
    height: 1,
    backgroundColor: 'rgba(72, 81, 114, 0.6)',
    marginHorizontal: normalizeWidth(12),
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: normalizeHeight(14),
    paddingHorizontal: normalizeWidth(16),
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: normalizeHeight(5),
  },
  statIconBoxExercises: {
    width: normalizeWidth(35),
    height: normalizeWidth(35),
    borderRadius: normalizeWidth(22),
    backgroundColor: '#332b56',
    borderWidth: normalize(1),
    borderColor: '#382f5b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconBoxTime: {
    width: normalizeWidth(35),
    height: normalizeWidth(35),
    borderRadius: normalizeWidth(22),
    backgroundColor: '#283569',
    borderWidth: normalize(1),
    borderColor: '#28386c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: normalize(9),
    fontWeight: '500',
    color: '#8489a4',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginTop: normalizeHeight(2)
  },
  statValue: {
    fontSize: normalize(17),
    fontWeight: '700',
    color: '#F2F4F8',
    letterSpacing: 0.3,
  },
  statsVerticalDivider: {
    width: 1,
    backgroundColor: 'rgba(72, 81, 114, 0.6)',
    alignSelf: 'stretch',
    marginHorizontal: normalizeWidth(4),
  },
  summaryContainer: {
    marginHorizontal: normalizeWidth(12),
    marginBottom: normalizeHeight(12),
    marginTop: normalizeHeight(8),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#3a4060',
    backgroundColor: '#262e4e',
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(14),
    paddingVertical: normalizeHeight(13),
    gap: normalizeWidth(12),
  },
  summaryText: {
    flex: 1,
    fontSize: normalize(12),
    fontWeight: '500',
    color: '#628ef6',
  },
});
