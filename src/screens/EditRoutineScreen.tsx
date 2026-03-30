import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { ExercisePickerModal } from '../components';
import { databaseController } from '../data';
import down_arrow from '../images/down-arrow.png';
import red_dustbin from '../images/red-dustbin.png';
import white_plus from '../images/white-plus.png'
import white_left_arrow from '../images/white-left-arrow.png';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';


const EditRoutineScreen = ({ navigation, route }: any) => {
    const { params } = route;
    const { routine: routineProp } = params || {};
    const [routine, setRoutine] = useState(routineProp || { exercises: [] })

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

    const onDeleteExercise = (exerciseId: string) => {
        const updatedExercises = routine.exercises.filter((ex: any) => ex.id !== exerciseId);
        setRoutine({ ...routine, exercises: updatedExercises } as any);
    };

    const onAddExercise = () => {
        const newExercise = {
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

    const onUpdateRoutine = () => {
        console.log('Routine Object:', routine);
        databaseController.updateRoutine(routine.id, routine);
        navigation.goBack();
    };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (<View style={{
        backgroundColor: '#292f46',
        borderColor: '#383e55',
        borderWidth: normalize(1),
        borderRadius: normalize(8),
        paddingHorizontal: normalizeWidth(12),
        paddingVertical: normalizeHeight(12)}}>
       <TouchableOpacity style={{
        backgroundColor:'#202034',
        paddingHorizontal: normalizeWidth(10),
        paddingVertical: normalizeHeight(8),
        borderRadius: normalize(6),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
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
            height:normalizeHeight(6),
            aspectRatio: (320.0/173.0),
            width: normalizeHeight(6)* (320.0/173.0)
         }}/>
       </TouchableOpacity>

       <View style={{
           marginTop: normalizeHeight(12),
           flexDirection: 'row',
           justifyContent: 'flex-start',
           gap: normalizeWidth(12)
       }}>
           <View style={{ flex: 0.25 }}>
               <Text style={{
                   color: '#8a8a9e',
                   fontSize: normalize(12),
                   marginBottom: normalizeHeight(6),
                   fontWeight: '500'
               }}>Sets</Text>
               <TextInput
                   style={{
                       backgroundColor: '#202034',
                       borderColor: '#383e55',
                       borderWidth: normalize(1),
                       borderRadius: normalize(6),
                       paddingHorizontal: normalizeWidth(10),
                       paddingVertical: normalizeHeight(8),
                       color: '#fff',
                       fontSize: normalize(14),
                       textAlign: 'left'
                   }}
                   value={String(item.sets || '')}
                   keyboardType='numeric'
                   editable={true}
                   onChangeText={(text) => {
                       const updatedExercises = routine.exercises.map((ex: any) => 
                           ex.id === item.id ? { ...ex, sets: Number(text) || '' } : ex
                       );
                       setRoutine({ ...routine, exercises: updatedExercises } as any);
                   }}
               />
           </View>

           <View style={{ flex: 0.25 }}>
               <Text style={{
                   color: '#8a8a9e',
                   fontSize: normalize(12),
                   marginBottom: normalizeHeight(6),
                   fontWeight: '500'
               }}>Reps</Text>
               <TextInput
                   style={{
                       backgroundColor: '#202034',
                       borderColor: '#383e55',
                       borderWidth: normalize(1),
                       borderRadius: normalize(6),
                       paddingHorizontal: normalizeWidth(10),
                       paddingVertical: normalizeHeight(8),
                       color: '#fff',
                       fontSize: normalize(14),
                       textAlign: 'left'
                   }}
                   value={String(item.reps || '')}
                   editable={true}
                   keyboardType='numeric'
                   onChangeText={(text) => {
                       const updatedExercises = routine.exercises.map((ex: any) => 
                           ex.id === item.id ? { ...ex, reps: Number(text) || undefined } : ex
                       );
                       setRoutine({ ...routine, exercises: updatedExercises } as any);
                   }}
               />
           </View>

           <View style={{ flex: 0.25 }}>
               <Text style={{
                   color: '#8a8a9e',
                   fontSize: normalize(12),
                   marginBottom: normalizeHeight(6),
                   fontWeight: '500'
               }}>Rest</Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <TextInput
                       style={{
                           flex: 1,
                           backgroundColor: '#202034',
                           borderColor: '#383e55',
                           borderWidth: normalize(1),
                           borderRadius: normalize(6),
                           paddingHorizontal: normalizeWidth(10),
                           paddingVertical: normalizeHeight(8),
                           color: '#fff',
                           fontSize: normalize(14),
                           textAlign: 'left'
                       }}
                       value={String(item.rest || '')}
                       keyboardType='numeric'
                       editable={true}
                       onChangeText={(text) => {
                           const updatedExercises = routine.exercises.map((ex: any) => 
                               ex.id === item.id ? { ...ex, rest: Number(text) || undefined } : ex
                           );
                           setRoutine({ ...routine, exercises: updatedExercises } as any);
                       }}
                   />
                   <Text style={{
                       color: '#fff',
                       fontSize: normalize(14),
                       marginLeft: normalizeWidth(6)
                   }}>sec</Text>
               </View>
           </View>
       </View>

       <View style={{
           marginTop: normalizeHeight(12)
       }}>
           <Text style={{
               color: '#8a8a9e',
               fontSize: normalize(12),
               marginBottom: normalizeHeight(6),
               fontWeight: '500'
           }}>Notes</Text>
           <TextInput
               style={{
                   backgroundColor: '#202034',
                   borderColor: '#383e55',
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
                   // Update notes in exercise
                   const updatedExercises = routine.exercises.map((ex: any) => 
                       ex.id === item.id ? { ...ex, notes: text } : ex
                   );
                   setRoutine({ ...routine, exercises: updatedExercises } as any);
               }}
           />
       </View>
       <View style={{
           marginTop: normalizeHeight(12)
       }}>
           <TouchableOpacity 
               style={{
                   flexDirection: 'row',
                   alignItems: 'center'
               }}
               onPress={() => {
                   onDeleteExercise(item.id)
               }}
           >
               <Image 
                   source={red_dustbin}
                   style={{
                       width: normalizeWidth(16),
                       height: normalizeHeight(16),
                       aspectRatio: 325/348,
                       marginRight: normalizeWidth(8)
                   }}
               />
               <Text style={{
                   color: '#e75c6d',
                   fontSize: normalize(14),
                   fontWeight: '500'
               }}>Delete</Text>
           </TouchableOpacity>
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
                >Edit Routine</Text>
            </View>

            <View style={{
                paddingHorizontal : normalizeWidth(16),
                marginTop: normalizeHeight(24)
            }}>
                <Text style={
                    { color: '#b3b2c5',
                     fontSize: normalize(15),
                      marginBottom: normalizeHeight(8)
                      }}>Routine Name</Text>
                <TextInput
                    style={{
                        backgroundColor: '#292f46',
                        borderColor: '#383e55',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: normalizeWidth(12),
                        paddingVertical: normalizeHeight(12),
                        color: '#fff',
                        fontSize: normalize(14)
                    }}
                    placeholder="Routine Name"
                    placeholderTextColor="rgba(255,255,255,0.3)"
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
                    color: '#b3b2c5',
                    fontSize: normalize(15),
                    fontWeight: '400',
                }}
                >Exercises</Text>
                <View style={{flex:1}}>
                <View style={{
                    height:normalizeHeight(1),
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    marginTop: normalizeHeight(3),
                    marginLeft: normalizeWidth(8),
                }}/>
                </View>
            </View>

            <FlatList
                data={routine.exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: normalizeHeight(8) }} />} 
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: normalizeWidth(16), marginTop: normalizeHeight(12) }}
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
                            alignItems: 'center',
                            marginTop: normalizeHeight(20),
                            marginBottom: normalizeHeight(30)
                        }}>
                            <TouchableOpacity
                                style={{
                                    borderWidth: normalize(1),
                                    borderColor: '#383e55',
                                    borderRadius: normalize(8),
                                    paddingHorizontal: normalizeWidth(20),
                                    paddingVertical: normalizeHeight(8),
                                    flexDirection: 'row',
                                    alignItems: 'center',
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
                                        tintColor: 'rgba(255,255,255,0.8)'
                                    }}
                                />
                                <Text style={{
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: normalize(14),
                                    fontWeight: '500'
                                }}>Add Exercise</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: normalizeWidth(16),
                paddingVertical: normalizeHeight(16),
                gap: normalizeWidth(12),
                borderTopWidth: normalizeHeight(1),
                borderColor: 'rgba(255,255,255,0.1)',
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderWidth: normalize(1),
                        borderColor: '#383e55',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    onPress={onCancelRoutine}
                >
                    <Text style={{
                        color: '#8a8a9e',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: isRoutineValid ? '#4f5b93' : 'rgba(79,91,147,0.5)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    disabled={!isRoutineValid}
                    onPress={onUpdateRoutine}
                >
                    <Text style={{
                        color: isRoutineValid ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>Update</Text>
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

export default EditRoutineScreen;
