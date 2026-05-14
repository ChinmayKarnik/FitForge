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
      borderRadius: normalize(8),
      backgroundColor: '#1f243b',
      paddingHorizontal: normalizeWidth(12),
      paddingVertical: normalizeHeight(6),
    }}>
      <Text style={{
        color: '#7fb3ff',
        fontSize: normalizeHeight(13),
        fontWeight: '600',
        letterSpacing: 0.5
      }}>
        SET {setNumber}
      </Text>
    </View>
  );
};

const SingularSetEntry = ({ reps, weight }) => {
  return (
    <Text style={{ color: 'white' }}>
      {reps} reps • {weight} kg
    </Text>
  );
};

const Divider = () => {
  return (
    <View
      style={{
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 8,
      }}
    />
  );
};

const IndividualSetEntry = ({ setNumber, reps, weight }) => {

  return (
  <View style={{
    flexDirection:'row',
   alignItems:'center'
  }}>
    <NthSetUI setNumber={setNumber}/>
    <Divider />
    <Text style={{
      color: '#7fb3ff',
      fontSize: normalizeHeight(13),
      fontWeight: '600',
      letterSpacing: 0.5
    }}>
      {reps} REPS {weight ? `• ${weight} KG` : ''}
    </Text>
  </View>)
  return (
    <Text style={{ color: 'white' }}>
      Set {setNumber}: {reps} reps • {weight} kg
    </Text>
  );
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
              fontSize: normalizeHeight(15),
              fontWeight: '500',
              marginBottom: normalizeHeight(4)
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
              return (<View key={index}>
                <View
                style={{
                  width:'100%',
                  height: normalize(1),
                  backgroundColor:'rgba(255,255,255,0.1)',
                  marginBottom: normalizeHeight(4),
                  marginTop:normalizeHeight(4)
                }}
                ></View>
                <IndividualSetEntry
                  setNumber={index + 1}
                  reps={obj.reps}
                  weight={obj.weight}
                />
              </View>)
              return (<View
                key={index}
                style={{
                  marginLeft: normalizeWidth(36),
                  marginBottom: isLast ? 0 : normalize(6),
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    width: normalizeWidth(15),
                    aspectRatio: (479.0 / 478.0),
                    marginRight: normalizeWidth(6),
                  }}
                  source={tick_purple_bg}
                />
                <Text
                  style={{
                    color: "#77778e",
                    fontSize: normalizeHeight(12),
                    fontWeight: '400'
                  }}
                >Set {index + 1} : {obj.reps} reps</Text>
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
