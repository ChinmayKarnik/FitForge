import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
    initialData,
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
   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} scrollEnabled={false} keyboardShouldPersistTaps="handled">
       <View style={[{
                   backgroundColor: '#252d47',
                   borderWidth: normalize(1),
                   borderRadius: normalize(16),
                   borderColor: 'rgba(255,255,255,0.20)',
                   marginHorizontal: normalizeWidth(16),
                   paddingHorizontal: normalizeWidth(16),
                   paddingBottom: normalizeHeight(14),
                   paddingTop: normalizeHeight(14),
                   },
                   removeHorizontalMargin && {marginHorizontal: 0}
                   ]}>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                   <Text style={{ flex: 1, fontSize: normalize(20), fontWeight: '700', color: '#F2F4F8', lineHeight: normalize(26), marginRight: normalizeWidth(8) }} numberOfLines={2}>
                     {setNumber ? `${exerciseName} · Set ${setNumber}` : exerciseName}
                   </Text>
                   <TouchableOpacity
                     onPress={onCloseForm}
                     hitSlop={{ top: 20, left: 20, right: 20, bottom: 10 }}
                   >
                     <Image source={white_cross}
                       style={{ width: normalize(14), height: normalize(14), aspectRatio: 1, tintColor: 'rgba(255,255,255,0.5)' }}
                     />
                   </TouchableOpacity>
                 </View>

                 <View style={{
                    height: normalizeHeight(1),
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    marginTop: normalizeHeight(12),
                    marginHorizontal: -normalizeWidth(16),
                 }} />

                 <View>
                    {
                      requiredParameters?.map((parameter,index)=>{
                        const isLast = index === requiredParameters.length - 1;
                        return (
                            <RequiredParameterField parameter={parameter} key={parameter.name} showBottomSeparator={!isLast} updateParameterWithValue={updateParameterWithValue} initialValue={initialData?.[parameter.name]}/>
                        )
                      })
                    }
                 </View>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalizeHeight(12) }}>
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       backgroundColor: '#5a1a22',
                       borderRadius: normalize(10),
                       paddingVertical: normalize(10),
                       marginRight: normalize(4),
                       alignItems: 'center',
                       borderWidth: normalize(1),
                       borderColor: 'rgba(220,108,114,0.45)',
                     }}
                     onPress={onDiscard}
                     activeOpacity={0.8}
                   >
                     <Text style={{ color: '#d1c4c9', fontWeight: '600', fontSize: normalize(16), letterSpacing: 0.5 }}>Discard</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       backgroundColor: '#2f4880',
                       borderRadius: normalize(10),
                       paddingVertical: normalize(10),
                       marginLeft: normalize(4),
                       alignItems: 'center',
                       borderWidth: normalize(1),
                       borderColor: '#4e68a6',
                     }}
                     onPress={onSave}
                     activeOpacity={0.8}
                   >
                     <Text style={{ color: '#d0d0db', fontWeight: '600', fontSize: normalize(16), letterSpacing: 0.5 }}>Save</Text>
                   </TouchableOpacity>
                 </View>

               </View>
     </ScrollView>
   </KeyboardAvoidingView>
  );
};

export default ExerciseForm;