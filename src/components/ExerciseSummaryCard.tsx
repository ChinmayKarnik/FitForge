//@ts-nocheck
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import dumbell_image from '../images/dumbell-purple.png'
import blue_dumbbell from '../images/blue-dumbbell.png'
import tick_purple_bg from '../images/tick-purple-bg.png'
import { databaseController } from '../data';


const ExerciseSummaryCard =  ({exercises}) => {
    const imageAspectRatio = (598.0/494.0);
    const imageHeight = normalize(23);
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

    useEffect(()=>{
    console.log("ckck exercises in summary card", exercises)
    },[exercises])
  
    const setsList = exercises.map((ex) => ({
      reps: ex.loggedData && typeof ex.loggedData['Reps'] !== 'undefined' ? ex.loggedData['Reps'] : 0
    }));
    
  return (
    <View style={{backgroundColor:  '#202144',
        borderWidth:normalize(1),
        borderColor: '#3c3c68',
        borderRadius: normalize(12),
        paddingHorizontal: normalizeWidth(12),
        paddingBottom: normalizeHeight(8),

    }}>
      <View style={{flexDirection:'row'}}>
        <Image style={{
            height:imageHeight,
            width:imageWidth,
            aspectRatio: imageAspectRatio,
            marginTop:normalizeHeight(8),
            marginRight: normalizeWidth(8)
        }} 
        source={blue_dumbbell}
         />
         <View style={{marginTop:normalizeHeight(10)}}>
            <Text 
            style={{
                color:"#d6d3de",
                fontSize: normalizeHeight(15),
                fontWeight:'500'
            }}
            >{exerciseName}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
             <Text style={{
                 color:"#77778e",
                fontSize: normalizeHeight(12),
                fontWeight:'400'
             }}>{timeText}</Text>
             <View style={{
                width:normalizeWidth(4),
                height:normalizeHeight(4),
                backgroundColor:'#77778e',
                borderRadius: normalize(12),
                marginLeft: normalizeWidth(6),
                marginRight: normalizeWidth(5)
             }} /> 
             <Text style={{
                 color:"#77778e",
                fontSize: normalizeHeight(12),
                fontWeight:'400'
             }} >{durationText}</Text>
            </View>
         </View>
      </View>

       <View style={{
          backgroundColor:"#4d4d75",
          height:normalizeHeight(1),
          width:'100%',
          marginVertical: normalizeHeight(7)
         }} />
      
      {
        setsList.map((obj,index)=>{
          const isLast = index === setsList.length - 1;
         return (<View
         style={{
          marginLeft: normalizeWidth(36),
          marginBottom: isLast ? 0 : normalize(6),
          flexDirection:'row',
          alignItems:'center'
         }}>
          <Image 
          style={{width:normalizeWidth(15),
            aspectRatio: (479.0/478.0),
            marginRight : normalizeWidth(6),
          }}
          source={tick_purple_bg}
          />
           <Text
            style={{
                 color:"#77778e",
                fontSize: normalizeHeight(12),
                fontWeight:'400'
             }}
           >Set {index + 1} : {obj.reps} reps</Text>
          </View>)
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
});

export default ExerciseSummaryCard;
