import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import down_arrow from '../images/down-arrow.png';

const AddRoutineScreen = () => {
    const [routine, setRoutine] = useState({
    id: '1',
    name: 'Push Day',
    exercises: [
      { id: '1', name: 'Weighted Push-ups', sets: 4, reps: 10, rest: 90, 
        notes: "Don't go to failure.  Try to pick a weight so that you can complete all sets with reps"
       },
      { id: '2', name: 'Pulsating Squats', sets: 3, rest: 60 },
    ],
    createdAt : Date.now()
  })

  const renderItem = ({ item }: { item: any }) => {
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
       }}>
        <Text style={{
            color: '#d4d7e4',
            fontSize: normalize(14),
            fontWeight: '400',
        }}>Select Exercise</Text>
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
                   editable={false}
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
                   editable={false}
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
                       editable={false}
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
                scrollEnabled={false}
                contentContainerStyle={{ marginHorizontal: normalizeWidth(16), marginTop: normalizeHeight(12) }}
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
