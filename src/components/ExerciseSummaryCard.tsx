//@ts-nocheck
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { normalize, normalizeF, normalizeHeight, normalizeHeightF, normalizeWidth, normalizeWidthF } from '../utils/normalize';
import dumbell_image from '../images/dumbell-purple.png'
import blue_dumbbell from '../images/blue-dumbbell.png'
import tick_purple_bg from '../images/tick-purple-bg.png'
import { databaseController } from '../data';
import clock from '../images/clock-thick-white.png'
import stopwatch from '../images/stopwatch-white.png'

const BLUE = '#7fb3ff';
const BLUE_BORDER = '#5a7bb3';


const NthSetUI = ({ setNumber, avoidMonochrome = false }) => {
  const accent = avoidMonochrome ? '#a1a9ea' : BLUE;
  const border = avoidMonochrome ? 'rgba(161,169,234,0.35)' : BLUE_BORDER;
  return (
    <View style={{
      borderWidth: normalize(1),
      borderColor: border,
      borderRadius: normalize(4),
      backgroundColor:'#2A314E',
      paddingHorizontal: normalizeWidthF(13,2),
      paddingVertical: normalizeHeight(3),
    }}>
      <Text style={{
        color: accent,
        fontSize: normalizeHeight(11),
        fontWeight: '600',
        letterSpacing: 0.3
      }}>
        SET {setNumber}
      </Text>
    </View>
  );
};

const NSetsUI = ({ numSets, avoidMonochrome = false }) => {
  const accent = BLUE;
  const border = BLUE_BORDER;
  return (
    <View style={{
      borderWidth: normalize(1),
      borderColor: border,
      borderRadius: normalize(4),
      backgroundColor: '#1f243b',
      paddingHorizontal: normalizeWidthF(13,2),
      paddingVertical: normalizeHeight(3),
      alignSelf: 'flex-start',
    }}>
      <Text style={{
        color: accent,
        fontSize: normalizeHeight(10),
        fontWeight: '600',
        letterSpacing: 0.3
      }}>
        {numSets} {numSets === 1 ? 'SET' : 'SETS'}
      </Text>
    </View>
  );
}

const formatTimeSecs = (secs: number): string => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  if (m === 0) return `${s} ${s === 1 ? 'sec' : 'secs'}`;
  if (s === 0) return `${m} ${m === 1 ? 'min' : 'mins'}`;
  return `${m} ${m === 1 ? 'min' : 'mins'} ${s} ${s === 1 ? 'sec' : 'secs'}`;
};

const SingularSetEntry = ({ reps, weight, time, isTimeBased = false, avoidMonochrome = false }) => {
  const weightAccent = BLUE;
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <NSetsUI numSets={1} avoidMonochrome={avoidMonochrome} />
      <Divider
        marginLeft={normalizeWidth(12)}
        marginRight={normalizeWidth(17)}
        width={normalizeWidthF(3,2)}
      />
      {isTimeBased ? (
        <Text style={{
          color: BLUE,
          fontSize: normalizeHeight(12),
          fontWeight: '600',
        }}>
          {formatTimeSecs(time || 0)}
        </Text>
      ) : (
        <Text style={{
          color: BLUE,
          fontSize: normalizeHeight(12),
          width:normalizeWidth(60),
          fontWeight: '600',
        }}>
          {reps} {reps === 1 ? 'REP' : 'REPS'}
        </Text>
      )}
      {weight ? (
        <>
          <View style={{
            width: normalizeWidth(3.5),
            height: normalizeHeight(3.5),
            backgroundColor: '#77778e',
            borderRadius: normalize(6),
            marginRight: normalizeWidth(12)
          }} />
          <Text style={{
            color: weightAccent,
            fontSize: normalizeHeight(12),
            fontWeight: '600',
          }}>
            {weight} KG
          </Text>
        </>
      ) : null}
    </View>
  );
};

const Divider = ({height = normalizeHeight(14),marginLeft,marginRight,
  width = normalizeWidth(1)
}) => {
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginLeft,
        marginRight
      }}
    />
  );
};

const IndividualSetEntry = ({ setNumber, reps, weight, time, isTimeBased = false, avoidMonochrome = false }) => {
  const weightAccent = BLUE;
  return (
  <View style={{
    flexDirection:'row',
   alignItems:'center',
  }}>
    <NthSetUI setNumber={setNumber} avoidMonochrome={avoidMonochrome} />
    <Divider
    marginLeft={normalizeWidth(12)}
    marginRight={normalizeWidth(17)}
    width={normalizeWidthF(3,2)}
    />
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <View style={!isTimeBased ? { width: normalizeWidth(60) } : {}}>
        {isTimeBased ? (
          <Text style={{
            color: BLUE,
            fontSize: normalizeHeight(12),
            fontWeight: '600',
            letterSpacing: 0.3
          }}>
            {formatTimeSecs(time || 0)}
          </Text>
        ) : (
          <Text style={{
            color: BLUE,
            fontSize: normalizeHeight(12),
            fontWeight: '600',
            letterSpacing: 0.3
          }}>
            {reps} {reps === 1 ? 'REP' : 'REPS'}
          </Text>
        )}
      </View>
      {weight ? (
        <>
          <View style={{
            width: normalizeWidth(3.5),
            height: normalizeHeight(3.5),
            backgroundColor: '#77778e',
            borderRadius: normalize(6),
            marginRight: normalizeWidth(12)
          }} />
          <Text style={{
            color: weightAccent,
            fontSize: normalizeHeight(12),
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


const ExerciseSummaryCard = ({ exercises, avoidMonochrome = false }) => {
  const imageAspectRatio = (598.0 / 494.0);
  const imageHeight = normalize(20);
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
      if (startStr === endStr) {
        timeText = startStr;
      } else {
        const startAMPM = startStr.split(' ')[1];
        const endAMPM = endStr.split(' ')[1];
        if (startAMPM === endAMPM) {
          timeText = `${startStr.split(' ')[0]} - ${endStr}`;
        } else {
          timeText = `${startStr} - ${endStr}`;
        }
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

  const isTimeBased = !!exerciseFromDb?.requiredParameters?.some((p: any) => p.type === 'time');

  const setsList = exercises.map((ex) => ({
    reps:
      ex.loggedData && typeof ex.loggedData['Reps'] !== 'undefined'
        ? ex.loggedData['Reps']
        : 0,
    weight:
      ex.loggedData && typeof ex.loggedData['Weight'] !== 'undefined'
        ? ex.loggedData['Weight']
        : 0,
    time:
      ex.loggedData && typeof ex.loggedData['Time'] !== 'undefined'
        ? ex.loggedData['Time']
        : 0,
  }));

  return (
    <View style={{
      backgroundColor:'#212841',
      borderWidth: normalize(1),
      borderColor: '#3c3c68',
      borderRadius: normalize(12),
      paddingHorizontal: normalizeWidth(16),
      paddingTop: normalizeHeight(10)

    }}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View style={{
            backgroundColor: '#212841',
            borderRadius: normalize(6),
            padding: normalize(10),
            borderWidth: normalize(1),
            borderColor: '#3C465A' || 'rgba(255,255,255,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image style={{
              height: imageHeight,
              width: imageWidth,
              aspectRatio: imageAspectRatio,
              tintColor: avoidMonochrome ? '#a1a9ea' : '#7FAFFF'
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
                key={index}
                reps={obj.reps}
                weight={obj.weight}
                time={obj.time}
                isTimeBased={isTimeBased}
                avoidMonochrome={avoidMonochrome}
                />
              }
              const isLast = index === setsList.length - 1;
              const isFirst = (index === 0)
              return (<View key={index}>
                {
                  (!!isFirst) && (<>
                    <NSetsUI numSets={setsList.length} avoidMonochrome={avoidMonochrome}/>
                    <View style={{height:normalizeHeight(2)}}></View>
                    </>
                  )
                }
                <View
                style={{
                  width:'100%',
                  height: normalizeHeightF(3,2),
                  backgroundColor:'rgba(255,255,255,0.1)',
                  marginVertical:normalizeHeight(7)
                }}
                ></View>
                <IndividualSetEntry
                  setNumber={index + 1}
                  reps={obj.reps}
                  weight={obj.weight}
                  time={obj.time}
                  isTimeBased={isTimeBased}
                  avoidMonochrome={avoidMonochrome}
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
        marginTop: normalizeHeight(9)
      }} />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalizeHeight(9),
        marginBottom: normalizeHeight(8)
      }}>
        <Image source={clock}
          style={{
            width: normalizeWidth(14),
            aspectRatio: (453.0 / 448.0),
            marginRight: normalizeWidth(10),
            marginLeft: normalizeWidth(5),
            tintColor : 'rgba(255,255,255,0.5)'
          }
          } />
        <Text style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: normalizeHeight(12),
          fontWeight: '500'
        }}>{timeText}</Text>
        <View style={{
          width: normalizeWidthF(7,2),
          height: normalizeHeightF(7,2),
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: normalize(12),
          marginLeft: normalizeWidth(15),
          marginRight: normalizeWidth(17)
        }} />
        <Image source={stopwatch}
          style={{
            width: normalizeWidthF(23,2),
            aspectRatio: (346.0 / 395.0),
            marginRight: normalizeWidth(8),
            tintColor: 'rgba(255,255,255,0.5)'
          }
          } />
        <Text style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: normalizeHeight(12),
          fontWeight: '500'
        }} >{durationText}</Text>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
});

export default ExerciseSummaryCard;
