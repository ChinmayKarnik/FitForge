//@ts-nocheck
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import dumbell_image from '../images/dumbell-purple.png'
import blue_dumbbell from '../images/blue-dumbbell.png'
import tick_purple_bg from '../images/tick-purple-bg.png'
import { databaseController } from '../data';
import clock from '../images/clock-thick-white.png'
import stopwatch from '../images/stopwatch-white.png'

const NthSetUI = ({ setNumber}) => {
  return (
    <View style={{
      borderWidth: normalize(1),
      borderColor: '#5a7bb3',
      borderRadius: normalize(6),
      backgroundColor:'#232843' || '#1f243b',
      paddingHorizontal: normalizeWidth(9),
      paddingVertical: normalizeHeight(5),
    }}>
      <Text style={{
        color: '#7fb3ff',
        fontSize: normalizeHeight(13),
        fontWeight: '600',
        letterSpacing: 0.3
      }}>
        SET {setNumber}
      </Text>
    </View>
  );
};

const NSetsUI = ({ numSets }) => {
  return (
    <View style={{
      borderWidth: normalize(1),
      borderColor: '#5a7bb3',
      borderRadius: normalize(6),
      backgroundColor: '#1f243b',
      paddingHorizontal: normalizeWidth(8),
      paddingVertical: normalizeHeight(3),
      alignSelf: 'flex-start',
      marginBottom: normalizeHeight(4),
    }}>
      <Text style={{
        color: '#7fb3ff',
        fontSize: normalizeHeight(13),
        fontWeight: '700',
        letterSpacing: 0.3
      }}>
        {numSets} SETS
      </Text>
    </View>
  );
}

const SingularSetEntry = ({ reps, weight }) => {
  return (
    <Text style={{ color: 'white' }}>
      {reps} reps • {weight} kg
    </Text>
  );
};

const Divider = ({height = normalizeHeight(14),marginLeft,marginRight}) => {
  return (
    <View
      style={{
        width: 1,
        height,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginLeft,
        marginRight
      }}
    />
  );
};

const IndividualSetEntry = ({ setNumber, reps, weight }) => {

  return (
  <View style={{
    flexDirection:'row',
   alignItems:'center',
   marginBottom: normalizeHeight(4)
  }}>
    <NthSetUI setNumber={setNumber}/>
    <Divider
    marginLeft={normalizeWidth(15)}
    marginRight={normalizeWidth(20)}
    />
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Text style={{
        color: '#7fb3ff',
        fontSize: normalizeHeight(14),
        fontWeight: '600',
        letterSpacing: 0.3
      }}>
        {reps} REPS
      </Text>
      {weight ? (
        <>
          <View style={{
            width: normalizeWidth(3.5),
            height: normalizeHeight(3.5),
            backgroundColor: '#77778e',
            borderRadius: normalize(6),
            marginHorizontal: normalizeWidth(12)
          }} />
          <Text style={{
            color: '#7fb3ff',
            fontSize: normalizeHeight(15),
            fontWeight: '600',
            letterSpacing: 0.3
          }}>
            {weight} KG
          </Text>
        </>
      ) : null}
    </View>
  </View>)
};


const ExerciseSummaryCard = ({ exercises }) => {
  const imageAspectRatio = (598.0 / 494.0);
  const imageHeight = normalize(30);
  const imageWidth = imageAspectRatio * imageHeight;

  const exerciseFromDb = databaseController.getExerciseById(exercises[0].exerciseId)
  const exerciseName = exerciseFromDb ? exerciseFromDb.name : "Exercise Name"

  // Get timeText as 'start - end' formatted
  function formatTime(ts) {
    const date = new Date(ts);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minStr} ${ampm}`;
  }
  let timeText = '';
  if (exercises && exercises.length > 0) {
    const start = exercises[0].startTime;
    const end = exercises[exercises.length - 1].endTime;
    if (start && end) {
      const startStr = formatTime(start);
      const endStr = formatTime(end);
      // If both times are in the same AM/PM, show as '5:30 - 5:37 PM', else '11:55 AM - 12:05 PM'
      const startAMPM = startStr.split(' ')[1];
      const endAMPM = endStr.split(' ')[1];
      if (startAMPM === endAMPM) {
        timeText = `${startStr.split(' ')[0]} - ${endStr}`;
      } else {
        timeText = `${startStr} - ${endStr}`;
      }
    }
  }

  let durationText = "";
  if (exercises && exercises.length > 0) {
    const start = exercises[0].startTime;
    const end = exercises[exercises.length - 1].endTime;
    if (start && end) {
      let durationMs = end - start;
      let durationMin = Math.ceil(durationMs / 60000);
      if (durationMin < 1) durationMin = 1;
      if (durationMin >= 60) {
        const hours = Math.floor(durationMin / 60);
        const mins = durationMin % 60;
        durationText = `${hours} hr${hours > 1 ? 's' : ''}`;
        if (mins > 0) durationText += ` ${mins} min${mins > 1 ? 's' : ''}`;
      } else {
        durationText = `${durationMin} minute${durationMin > 1 ? 's' : ''}`;
      }
    }
  }

  useEffect(() => {
    console.log("ckck exercises in summary card", exercises)
  }, [exercises])

  const setsList = exercises.map((ex) => ({
    reps:
      ex.loggedData && typeof ex.loggedData['Reps'] !== 'undefined'
        ? ex.loggedData['Reps']
        : 0,

    weight:
      ex.loggedData && typeof ex.loggedData['Weight'] !== 'undefined'
        ? ex.loggedData['Weight']
        : 0,
  }));

  return (
    <View style={{
      backgroundColor: '#1f243a' || 'rgba(42, 50, 75, 1)',
      borderWidth: normalize(1),
      borderColor: '#3c3c68',
      borderRadius: normalize(12),
      paddingHorizontal: normalizeWidth(16),
      paddingTop: normalizeHeight(10)

    }}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View style={{
            backgroundColor: '#1f243b',
            borderRadius: normalize(10),
            padding: normalize(10),
            marginRight: normalizeWidth(8),
            borderWidth: normalize(1),
            borderColor: 'rgba(255,255,255,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image style={{
              height: imageHeight,
              width: imageWidth,
              aspectRatio: imageAspectRatio,
            }}
              source={blue_dumbbell}
            />
          </View>
        </View>
        <View style={{
           marginLeft: normalizeWidth(10),
           flex: 1
          }}>
          <Text
            style={{
              color: "#d6d3de",
              fontSize: normalizeHeight(17),
              fontWeight: '500',
              marginBottom: normalizeHeight(7)
            }}
          >{exerciseName}</Text>

          {
            setsList.map((obj, index) => {

              if(setsList.length ==1){
                return <SingularSetEntry 
                reps = {obj.reps}
                weight={obj.weight}
                />
              }
              const isLast = index === setsList.length - 1;
              const isFirst = (index === 0)
              return (<View key={index}>
                {
                  (!!isFirst) && (
                    <NSetsUI numSets={setsList.length}/>
                  )
                }
                <View
                style={{
                  width:'100%',
                  height: normalize(2),
                  backgroundColor:'rgba(255,255,255,0.1)',
                  marginBottom: normalizeHeight(10),
                  marginTop:normalizeHeight(7)
                }}
                ></View>
                <IndividualSetEntry
                  setNumber={index + 1}
                  reps={obj.reps}
                  weight={obj.weight}
                />
              </View>)
            })
          }
        </View>

      </View>

      <View style={{
        backgroundColor: "#4d4d75",
        height: normalizeHeight(1),
        width: '100%',
        marginTop: normalizeHeight(7)
      }} />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalizeHeight(9),
        marginBottom: normalizeHeight(8)
      }}>
        <Image source={clock}
          style={{
            width: normalizeWidth(13),
            aspectRatio: (453.0 / 448.0),
            marginRight: normalizeWidth(6),
            marginLeft: normalizeWidth(5),
            tintColor : '#8c91ad'
          }
          } />
        <Text style={{
          color: "#77778e",
          fontSize: normalizeHeight(13),
          fontWeight: '500'
        }}>{timeText}</Text>
        <View style={{
          width: normalizeWidth(4),
          height: normalizeHeight(4),
          backgroundColor: '#77778e',
          borderRadius: normalize(12),
          marginLeft: normalizeWidth(10),
          marginRight: normalizeWidth(10)
        }} />
        <Image source={stopwatch}
          style={{
            width: normalizeWidth(12),
            aspectRatio: (346.0 / 395.0),
            marginRight: normalizeWidth(6),
            tintColor: '#8c91ad'
          }
          } />
        <Text style={{
          color: "#77778e",
          fontSize: normalizeHeight(13),
          fontWeight: '500'
        }} >{durationText}</Text>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
});

export default ExerciseSummaryCard;
