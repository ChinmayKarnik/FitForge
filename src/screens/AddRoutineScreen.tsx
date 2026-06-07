import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { ExercisePickerModal } from '../components';
import { databaseController } from '../data';
import down_arrow from '../images/down-arrow.png';
import dustbin from '../images/dustbin.png';
import white_plus from '../images/white-plus.png'
import white_left_arrow from '../images/white-left-arrow.png';
import dumbbell_2 from '../images/dumbbell-2.png';
import stopwatch_white_2 from '../images/stopwatch-white-2.png';
import repeat from '../images/repeat.png';
import notes_icon from '../images/notes.png';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';

const ACCENT = '#4f7ee8';

const AddRoutineScreen = ({ navigation }: any) => {
    const [routine, setRoutine] = useState({
        exercises: []
    })

    const [showExercisePicker, setShowExercisePicker] = useState(false);
   const [pickerExerciseIndex,setPickerExerciseIndex] = useState(null);
    const exercises = databaseController.getAllExercises();

    const isRoutineValid = 
        routine.name && 
        routine.name.trim() !== '' &&
        routine.exercises && 
        routine.exercises.length > 0 &&
        routine.exercises.every((exercise: any) => 
            exercise.id && 
            exercise.name && 
            exercise.name.trim() !== '' &&
            exercise.sets !== undefined
        );

    const handleSelectExercise = (exercise: any) => {
        console.log("ckck exercise inside ",exercise)
       const newRoutine = {...routine};
       newRoutine.exercises[pickerExerciseIndex] = {
        ...newRoutine.exercises[pickerExerciseIndex],
        name: exercise.name,
        id: exercise.id
       }
       setRoutine(newRoutine);
    setPickerExerciseIndex(null);
    };

    const onDeleteExercise = (localId: string) => {
        const updatedExercises = routine.exercises.filter((ex: any) => ex.localId !== localId);
        setRoutine({ ...routine, exercises: updatedExercises } as any);
    };

    const onAddExercise = () => {
        const newExercise = {
            localId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: undefined,
            sets: 1,
            reps: undefined,
            rest: undefined,
            notes: undefined,
        };
        setRoutine({
            ...routine,
            exercises: [...routine.exercises, newExercise],
        } as any);
    };

    const onCancelRoutine = () => {
        navigation.goBack();
    };

    const onCreateRoutine = () => {
        console.log('Routine Object:', routine);
        databaseController.addRoutine(routine);
        navigation.goBack();
    };

  const renderInputLabel = (icon: any, label: string, aspectRatio: number = 1, iconWidth: number = 13) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalizeHeight(6) }}>
          <Image source={icon} style={{
              width: normalizeWidth(iconWidth),
              height: normalizeWidth(iconWidth) / aspectRatio,
              tintColor: 'rgba(255,255,255,0.7)',
              marginRight: normalizeWidth(8),
              resizeMode: 'contain',
          }} />
          <Text style={{
              color: '#dbdfea',
              fontSize: normalize(12),
              fontWeight: '500'
          }}>{label}</Text>
      </View>
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (<View style={{
        flexDirection: 'row',
        borderRadius: normalize(12),
        backgroundColor: '#2b3248',
        borderWidth: normalize(1),
        borderColor:'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    }}>
       <View style={{ width: normalizeWidth(6), backgroundColor: ACCENT }} />
       <View style={{ flex: 1, paddingHorizontal: normalizeWidth(16), paddingVertical: normalizeHeight(18) }}>

           {/* Name/picker row + corner delete button */}
           <View style={{ flexDirection: 'row', alignItems: 'center', gap: normalizeWidth(10) }}>
               <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor:'#1c2337',
                    paddingHorizontal: normalizeWidth(10),
                    paddingVertical: normalizeHeight(10),
                    borderRadius: normalize(8),
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderWidth:normalize(1),
                    borderColor: 'rgba(255,255,255,0.5)'
               }}
               onPress={() => {
                   setPickerExerciseIndex(index);
                   setShowExercisePicker(true);
               }}>
                <Text style={{
                    color: '#d4d7e4',
                    fontSize: normalize(14),
                    fontWeight: '400',
                }}>{item.name || 'Select Exercise'}</Text>
                <Image source={down_arrow} style={{
                    height:normalizeHeight(5),
                    aspectRatio: (320.0/173.0),
                    width: normalizeHeight(5)* (320.0/173.0),
                    marginRight: normalizeWidth(2),
                 }}/>
               </TouchableOpacity>

               <TouchableOpacity
                   style={{
                       width: normalizeWidth(22),
                       height: normalizeWidth(22),
                       borderRadius: normalize(11),
                       marginRight:-normalizeWidth(4),
                       marginLeft: normalizeWidth(10),
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}
                   hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                   onPress={() => {
                       onDeleteExercise(item.localId)
                   }}
               >
                   <Image
                       source={dustbin}
                       style={{
                           width: normalizeWidth(15),
                           height: normalizeWidth(15) * (471 / 406),
                           tintColor: '#f45765',

                       }}
                   />
               </TouchableOpacity>
           </View>

           <View style={{
               marginTop: normalizeHeight(20),
               flexDirection: 'row',
               gap: normalizeWidth(20),
           }}>
               <View style={{ flex: 1 }}>
                   {renderInputLabel(dumbbell_2, 'Sets', 410 / 241, 17)}
                   <TextInput
                       style={{
                           backgroundColor: '#1c2337',
                           borderColor: 'rgba(255,255,255,0.5)',
                           borderWidth: normalize(1),
                           borderRadius: normalize(6),
                           paddingHorizontal: normalizeWidth(8),
                           paddingVertical: normalizeHeight(7),
                           color: '#fff',
                           fontSize: normalize(14),
                           textAlign: 'left'
                       }}
                       value={String(item.sets || '')}
                       keyboardType='numeric'
                       editable={true}
                       onChangeText={(text) => {
                           const updatedExercises = routine.exercises.map((ex: any) =>
                               ex.localId === item.localId ? { ...ex, sets: Number(text) || '' } : ex
                           );
                           setRoutine({ ...routine, exercises: updatedExercises } as any);
                       }}
                   />
               </View>

               <View style={{ flex: 1 }}>
                   {renderInputLabel(repeat, 'Reps', 467 / 429)}
                   <TextInput
                       style={{
                           backgroundColor: '#1c2337',
                           borderColor: 'rgba(255,255,255,0.5)',
                           borderWidth: normalize(1),
                           borderRadius: normalize(6),
                           paddingHorizontal: normalizeWidth(8),
                           paddingVertical: normalizeHeight(7),
                           color: '#fff',
                           fontSize: normalize(14),
                           textAlign: 'left'
                       }}
                       value={String(item.reps || '')}
                       editable={true}
                       keyboardType='numeric'
                       onChangeText={(text) => {
                           const updatedExercises = routine.exercises.map((ex: any) =>
                               ex.localId === item.localId ? { ...ex, reps: Number(text) || undefined } : ex
                           );
                           setRoutine({ ...routine, exercises: updatedExercises } as any);
                       }}
                   />
               </View>

               <View style={{ flex: 1.2 }}>
                   {renderInputLabel(stopwatch_white_2, 'Rest', 372 / 420)}
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <TextInput
                           style={{
                               flex: 1,
                               backgroundColor: '#1c2337',
                               borderColor: 'rgba(255,255,255,0.5)',
                               borderWidth: normalize(1),
                               borderRadius: normalize(6),
                               paddingHorizontal: normalizeWidth(8),
                               paddingVertical: normalizeHeight(7),
                               color: '#fff',
                               fontSize: normalize(14),
                               textAlign: 'left'
                           }}
                           value={String(item.rest || '')}
                           keyboardType='numeric'
                           editable={true}
                           onChangeText={(text) => {
                               const updatedExercises = routine.exercises.map((ex: any) =>
                                   ex.localId === item.localId ? { ...ex, rest: Number(text) || undefined } : ex
                               );
                               setRoutine({ ...routine, exercises: updatedExercises } as any);
                           }}
                       />
                       <Text style={{
                           color: 'rgba(255,255,255,0.6)',
                           fontSize: normalize(13),
                           marginLeft: normalizeWidth(6)
                       }}>sec</Text>
                   </View>
               </View>
           </View>

           <View style={{
               marginTop: normalizeHeight(20)
           }}>
               <View style={{ marginBottom: normalizeHeight(6) }}>
                   {renderInputLabel(notes_icon, 'Notes', 358 / 441)}
               </View>
               <TextInput
                   style={{
                       backgroundColor: '#1c2337',
                       borderColor: 'rgba(255,255,255,0.5)',
                       borderWidth: normalize(1),
                       borderRadius: normalize(6),
                       paddingHorizontal: normalizeWidth(12),
                       paddingVertical: normalizeHeight(10),
                       color: '#fff',
                       fontSize: normalize(13),
                       textAlignVertical: 'top',
                       minHeight: normalizeHeight(80)
                   }}
                   value={item.notes || ''}
                   editable={true}
                   multiline
                   onChangeText={(text) => {
                       const updatedExercises = routine.exercises.map((ex: any) =>
                           ex.localId === item.localId ? { ...ex, notes: text } : ex
                       );
                       setRoutine({ ...routine, exercises: updatedExercises } as any);
                   }}
               />
           </View>
       </View>
        </View>);
  };


    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: normalizeHeight(46), left: normalizeWidth(16) }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{
                            width: normalizeWidth(9),
                            height: normalizeWidth(9) * (86.0 / 51.0),
                            aspectRatio: (51.0 / 86.0),
                            resizeMode: 'stretch',
                        }}
                        source={white_left_arrow}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Add Routine</Text>
            </View>

            <View style={{
                paddingHorizontal : normalizeWidth(16),
                marginTop: normalizeHeight(32)
            }}>
                <Text style={
                    { color: 'rgba(255,255,255,0.9)',
                     fontSize: normalize(15),
                     fontWeight: '600',
                      marginBottom: normalizeHeight(8)
                      }}>Routine Name</Text>
                <TextInput
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,0.3)',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: normalize(14)
                    }}
                    placeholder="Routine Name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={routine.name}
                    onChangeText={(text) => setRoutine({ ...routine, name: text })}
                />
            </View>

            <View
            style={{flexDirection:'row',
                alignItems:'center',
                marginHorizontal: normalizeWidth(16),
                marginTop: normalizeHeight(10)
            }}
            >
                <Text
                style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: normalize(15),
                    fontWeight: '600',
                }}
                >Exercises</Text>
                <View style={{flex:1}}>
                <View style={{
                    height:normalizeHeight(1),
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    marginTop: normalizeHeight(3),
                    marginLeft: normalizeWidth(8),
                }}/>
                </View>
            </View>

            <FlatList
                data={routine.exercises}
                keyExtractor={(item) => item.localId}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: normalizeHeight(8) }} />} 
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: normalizeWidth(16), marginTop: normalizeHeight(18) }}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: normalizeHeight(50), marginBottom: normalizeHeight(0) }}>
                        <Text style={{
                            color: '#d4d7e4',
                            fontSize: normalize(18),
                            fontWeight: '500',
                            marginBottom: normalizeHeight(8),
                            textAlign: 'center',
                        }}>
                            No exercises added yet
                        </Text>
                        <Text style={{
                            color: '#b3b2c5',
                            fontSize: normalize(15),
                            fontWeight: '400',
                            textAlign: 'center',
                        }}>
                            Tap the button below to add your first exercise.
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => {
                    return (
                        <View style={{
                            marginTop: normalizeHeight(28),
                            marginBottom: normalizeHeight(30)
                        }}>
                            <TouchableOpacity
                                style={{
                                    borderWidth: normalize(1),
                                    borderColor: '#7f8ec7',
                                    backgroundColor: 'transparent',
                                    borderRadius: normalize(10),
                                    paddingVertical: normalizeHeight(12),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: normalizeHeight(100)
                                }}
                                onPress={onAddExercise}
                            >
                                <Image
                                    source={white_plus}
                                    style={{
                                        height: normalizeHeight(10),
                                        width: (112.0 / 115.0) * normalize(10),
                                        aspectRatio: (115.0 / 112.0),
                                        marginRight: normalizeWidth(6),
                                        tintColor: '#7f8ec7'
                                    }}
                                />
                                <Text style={{
                                    color: '#7f8ec7',
                                    fontSize: normalize(14),
                                    fontWeight: '600'
                                }}>Add Exercise</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: normalizeWidth(16),
                paddingTop: normalizeHeight(16),
                paddingBottom: normalizeHeight(16),
                gap: normalizeWidth(12),
                backgroundColor: '#1c2238',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 12,
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderWidth: normalize(1),
                        borderColor: 'rgba(255,255,255,0.25)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    onPress={onCancelRoutine}
                >
                    <Text style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: isRoutineValid ? ACCENT : 'rgba(79,126,232,0.35)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    disabled={!isRoutineValid}
                    onPress={onCreateRoutine}
                >
                    <Text style={{
                        color: isRoutineValid ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Create</Text>
                </TouchableOpacity>
            </View>

            <ExercisePickerModal
                visible={showExercisePicker}
                startButtonText = "Select"
                exercises={exercises}
                onSelectExercise={handleSelectExercise}
                onClose={() => {
                    setShowExercisePicker(false);
                    setPickerExerciseIndex(null);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2238',
    },
});

export default AddRoutineScreen;
