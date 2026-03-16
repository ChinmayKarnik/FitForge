// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { normalizeWidth, normalizeHeight, normalize } from '../utils/normalize';
import { databaseController } from '../data';
import { getDayOfWeek } from '../utils/dateTimeUtils';
import { formatDateTimeString } from './dateTimeUtils';


type Exercise = {
  name?: string;
  exerciseName?: string;
  exerciseId?: string;
  id?: string;
};

type Workout = {
  startTime: number;
  endTime: number;
  exercises?: Exercise[];
  routineName?: string;
};

type Props = {
  workout: Workout;
  onPress?: () => void;
};

export const WorkoutSummaryCard: React.FC<Props> = ({ workout, onPress }) => {
  // Calculate duration in minutes and seconds
  const durationMs = workout.endTime - workout.startTime;
  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);
  const durationStr = `${durationMin}m ${durationSec < 10 ? '0' : ''}${durationSec}s`;
  const dayOfTheWeek = getDayOfWeek(workout.startTime);
  // Get distinct exercise names
  let exerciseNames: string[] = [];
  if (workout.exercises && workout.exercises.length > 0) {
    const allNames = workout.exercises.map((e: Exercise) => {
      const ex = databaseController.getExerciseById(e.exerciseId);
      return ex.name;
    });
    exerciseNames = Array.from(new Set(allNames));
  }
  const routine = databaseController.getRoutineById(workout.routineId);
  const routineName =  routine?.name || 'Free Workout'

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{flex:1,
        minHeight: 70,
        marginHorizontal: normalizeWidth(16),
      backgroundColor:'#292f46',
      borderRadius:normalizeHeight(10),
      borderWidth: normalize(1),
      borderColor: '#383e55'
      }}>
      <View style={{paddingLeft: normalizeWidth(14),
        paddingVertical:normalizeHeight(12),
        borderBottomWidth: normalize(1),
        borderBottomColor: '#484d63'
      }}>
         <Text style={{color: '#fcfbfc',
          fontWeight: '600'
         }}>{dayOfTheWeek} - {routineName}</Text>
      </View>

      <View style={{width:'80%',
        paddingHorizontal: normalizeWidth(14),
        paddingVertical: normalizeHeight(8),
        borderBottomWidth: normalize(1),
        borderBottomColor: '#484d63'
      }}>
        <View style={{flexDirection:'row'}}>
          <View><Text style={{color:"#fafafb"}}>{formatDateTimeString(workout.startTime)}</Text></View>
          <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <View style={{width:normalizeWidth(1),height:normalizeHeight(10),
              backgroundColor:'#30374c'
             }}></View>
          </View>
          <View><Text style={{color:"#fafafb"}}>Duration : {durationMin} min</Text></View>
        </View>
      </View>

      <View style={{paddingTop:normalizeHeight(8),
        paddingLeft: normalizeWidth(14),
        paddingBottom:normalizeHeight(10)
      }}>
        {
          exerciseNames.map((exName, index)=>{
           return (<View key={exName}>
            <Text style={{color:'#f8f8f9'}}>{exName}</Text>
            </View>)
          })
        }
      </View>

      </View>
    </TouchableOpacity>
  )

  
};

const styles = StyleSheet.create({
  cardOuterShadow: {
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 24,
    shadowColor: '#E5C97B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  cardContainer: {
    backgroundColor: '#FFFDF7',
    borderRadius: 24,
    padding: 22,
    minHeight: 120,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  timeText: {
    color: '#A89B7C',
    fontSize: 15,
    fontFamily: 'System',
    marginBottom: 6,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  placeholderCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F7B733',
    marginRight: 8,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7C6F57',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  durationText: {
    color: '#C6A15B',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'System',
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  exerciseList: {
    marginTop: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E5C97B',
    marginRight: 10,
  },
  exerciseName: {
    color: '#7C6F57',
    fontSize: 15,
    fontFamily: 'System',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    flex: 1,
    marginLeft: 24,
    marginVertical: 2,
    backgroundColor: '#F2E9D8',
  },
});
