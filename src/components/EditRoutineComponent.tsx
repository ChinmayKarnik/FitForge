import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { ExercisePickerModal } from './ExercisePickerModal';
import { databaseController } from '../data';
import down_arrow from '../images/down-arrow.png';
import dustbin from '../images/dustbin.png';
import white_plus from '../images/white-plus.png'
import white_left_arrow from '../images/white-left-arrow.png';
import dumbbell_2 from '../images/dumbbell-2.png';
import stopwatch_white_2 from '../images/stopwatch-white-2.png';
import repeat from '../images/repeat.png';
import notes_icon from '../images/notes.png';
import notepad_with_plus from '../images/notepad-with-plus.png';

const ACCENT = '#4f7ee8';

export const EditRoutineComponent = ({ navigation, route, isAddRoutineScreen }: any) => {
    const routineProp = route?.params?.routine;
    const [routine, setRoutine] = useState(() => {
        if (isAddRoutineScreen) {
            return { exercises: [] };
        }
        const initialRoutine = routineProp || { exercises: [] };
        return {
            ...initialRoutine,
            exercises: (initialRoutine.exercises || []).map((exercise: any) => ({
                ...exercise,
                localId: exercise.localId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            })),
        };
    })

    const [showExercisePicker, setShowExercisePicker] = useState(false);
   const [pickerExerciseIndex,setPickerExerciseIndex] = useState(null);
    const exercises = databaseController.getAllExercises();
    const flatListRef = useRef<FlatList<any>>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        setIsAtBottom(contentOffset.y + layoutMeasurement.height >= contentSize.height - 16);
    };

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
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const onCancelRoutine = () => {
        navigation.goBack();
    };

    const onSubmitRoutine = () => {
        console.log('Routine Object:', routine);
        if (isAddRoutineScreen) {
            databaseController.addRoutine(routine);
        } else {
            databaseController.updateRoutine(routine.id, routine);
        }
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
                    color: item.name ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)',
                    fontSize: normalize(14),
                    fontWeight: '500',
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
                           color: 'rgba(255,255,255,0.8)',
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
                            color: 'rgba(255,255,255,0.8)',
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
                               color: 'rgba(255,255,255,0.8)',
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
                       color: 'rgba(255,255,255,0.7)',
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
                >{isAddRoutineScreen ? 'Add Routine' : 'Edit Routine'}</Text>
            </View>

            <View style={{
                paddingHorizontal : normalizeWidth(16),
                marginTop: normalizeHeight(18)
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
                        color: 'rgba(255,255,255,1)',
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
                marginTop: normalizeHeight(10),
                marginBottom: normalizeHeight(8)
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

            <View style={{ flex: 1, position: 'relative' }}>
            <FlatList
                ref={flatListRef}
                data={routine.exercises}
                keyExtractor={(item) => item.localId}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: normalizeHeight(18) }} />}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ marginHorizontal: normalizeWidth(16), marginTop: normalizeHeight(8) }}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: normalizeHeight(28), marginBottom: normalizeHeight(0) }}>
                        <Image
                            source={notepad_with_plus}
                            style={{
                                width: normalizeWidth(52),
                                height: normalizeWidth(52) * (551.0 / 518.0),
                                tintColor: 'rgba(255,255,255,0.5)',
                                marginBottom: normalizeHeight(18),
                                resizeMode: 'contain',
                            }}
                        />
                        <Text style={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: normalize(17),
                            fontWeight: '600',
                            marginBottom: normalizeHeight(7),
                            textAlign: 'center',
                        }}>
                            No exercises added yet
                        </Text>
                        <Text style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: normalize(13),
                            fontWeight: '400',
                            textAlign: 'center',
                            lineHeight: normalize(18),
                            marginBottom: normalizeHeight(20),
                        }}>{"Tap the button below to add your first exercise."}</Text>
                    </View>
                )}
                ListFooterComponent={() => {
                    const isEmpty = routine.exercises.length === 0;
                    return (
                        <View style={{
                            marginTop: normalizeHeight(isEmpty ? 0 : 20),
                            marginBottom: normalizeHeight(20),
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: isEmpty ? '60%' : '100%',
                                    borderWidth: normalize(1),
                                    borderColor: '#7f8ec7',
                                    backgroundColor: 'transparent',
                                    borderRadius: normalize(10),
                                    paddingVertical: normalizeHeight(12),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
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
            {!isAtBottom && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: normalizeHeight(60) }} pointerEvents="none">
                    <Svg height="100%" width="100%">
                        <Defs>
                            <LinearGradient id="exerciseListFade" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#1c2238" stopOpacity="0" />
                                <Stop offset="1" stopColor="#1c2238" stopOpacity="1" />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#exerciseListFade)" />
                    </Svg>
                </View>
            )}
            </View>
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
                        backgroundColor: isRoutineValid ? '#3d5a9e' : 'rgba(79,126,232,0.35)',
                        borderRadius: normalize(8),
                        paddingVertical: normalizeHeight(12),
                        alignItems: 'center'
                    }}
                    disabled={!isRoutineValid}
                    onPress={onSubmitRoutine}
                >
                    <Text style={{
                        color: isRoutineValid ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: normalize(16),
                        fontWeight: '500'
                    }}>{isAddRoutineScreen ? 'Create' : 'Update'}</Text>
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

export default EditRoutineComponent;
