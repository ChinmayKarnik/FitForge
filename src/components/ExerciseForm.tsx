import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_cross from '../images/cross-icon-white.png'
import { databaseController } from '../data';

import RequiredParameterField from './RequiredParameterField';

const ExerciseForm: React.FC = ({
    exerciseName,
    onCloseForm,
    exerciseId,
    onFormDataChange,
    formData,
    onSave,
    onDiscard,
    setNumber,
    removeHorizontalMargin
}) => {
    const exercise = databaseController.getExerciseById(exerciseId);
    const requiredParameters = exercise?.requiredParameters;
    
  const updateParameterWithValue = (parameterName, value) => {
    onFormDataChange((data) => {
      return {
        ...data,
        [parameterName]: value
      }
    })
  }
  
  return (
   <View style={[{backgroundColor:'#232441',
               borderWidth:normalize(1),
               borderRadius: normalize(10),
               borderColor: '#5a5a74',
               marginHorizontal: normalizeWidth(16),
               paddingHorizontal: normalizeWidth(12),
               paddingBottom: normalizeHeight(10),
               paddingTop: normalizeHeight(18),
               },
               removeHorizontalMargin && {marginHorizontal: 0} 
               
               ]}>
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                   <Text
                     style={{
                       fontSize: normalize(18),
                       fontWeight: '600',
                       lineHeight: normalize(24),
                       letterSpacing: normalize(0.3),
                       color: '#F2F4F8',
                     }}
                   >{setNumber ? `${exerciseName} - Set ${setNumber}` : `Log sets for ${exerciseName}`}</Text>
                   <TouchableOpacity
                     onPress={onCloseForm}
                     hitSlop={{ top: 20, left: 20, right: 20, bottom: 10 }}
                   >
                     <Image source={white_cross}
                       style={{
                         width: normalize(15),
                         height: normalize(15),
                         aspectRatio: 1
                       }}
                     />
                   </TouchableOpacity>
                 </View>
                 <View style={{
                    width:'90%',
                    height:normalizeHeight(1),
                    marginLeft: -normalize(12),
                    backgroundColor:'#383856',
                    marginTop:normalizeHeight(15),
                 }}></View>
                 
                 <View>
                    {
                      requiredParameters?.map((parameter,index)=>{
                        const isLast = index === requiredParameters.length - 1;
                        return (
                            <RequiredParameterField parameter={parameter} key={parameter.name} showBottomSeparator={!isLast} updateParameterWithValue={updateParameterWithValue}/>
                        )
                      })
                    }
                 </View>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', 
                  marginTop: normalizeHeight(4)
                  }}>
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       backgroundColor: '#364979',
                       borderRadius: normalize(8),
                       paddingVertical: normalize(10),
                       marginRight: normalize(4),
                       alignItems: 'center',
                       borderWidth: 1,
                       borderColor: '#7A8CB3',
                     }}
                     onPress={onSave}
                     activeOpacity={0.8}
                   >
                     <Text style={{ color: '#d0d0db', fontWeight: '600', fontSize: 18, letterSpacing: 0.5 }}>Save</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       backgroundColor: '#651824',
                       borderRadius: normalize(8),
                       paddingVertical: normalize(10),
                       marginLeft: normalize(4),
                       alignItems: 'center',
                       borderWidth: normalize(1),
                       borderColor: '#D97A7A',
                     }}
                     onPress={onDiscard}
                     activeOpacity={0.8}
                   >
                     <Text style={{ color: '#d1c4c9', fontWeight: '600', fontSize: 18, letterSpacing: 0.5 }}>Discard</Text>
                   </TouchableOpacity>
                 </View>
   
               </View>
  );
};

export default ExerciseForm;