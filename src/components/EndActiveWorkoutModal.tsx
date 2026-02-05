//@ts-nocheck
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const EndActiveWorkoutModal = ({ visible, onClose }) => {

    const dayOfTheWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    const workoutDefaultName = `${dayOfTheWeek} Workout`
    const exercisesList = [
        {
            name: 'Pull-Ups',
            sets: 3
        },
        {
            name: 'Weighted Push-Ups',
            sets: 2,
        },
        {
            name: 'Squats',
            sets: 3
        }
    ]

return (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={{ flex: 1, 
    width:'100%',
    height:'100%',
        justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
    <View style={{width:'100%',paddingHorizontal:normalizeWidth(16)}}>
      <View 
      style={{ backgroundColor: '#262745',
        borderRadius: normalize(12),
        borderWidth:normalize(1),
        borderColor: '#37384b',
        paddingTop:normalizeHeight(12),
         paddingHorizontal:normalize(12)
        }}>
        <Text style={{ color: '#F2F4F8', fontSize: normalize(18), fontWeight: '500' }}>End Workout?</Text>
        <Text 
        style={{ color: '#acadba',
         fontSize: normalize(14),
          marginTop: normalizeHeight(10),
          fontWeight: '400' }}>Are you sure you want to end your workout?</Text>
        
        <View style={{borderWidth:normalize(1),borderColor:'#33344f',
            backgroundColor:"#1d2039",
            paddingVertical:normalizeHeight(10),
            marginTop:normalizeHeight(12),
            borderRadius:normalize(6),
            alignItems:'center'
        }}>
           <Text
           style={{
            fontWeight: '500',
            color: '#d2d0db',
            fontSize: normalize(16)
           }}
           >Duration - 00 : 24 : 58</Text>
        </View>
        <Text
        style={{marginTop:normalizeHeight(10),
             color: '#acadba',
         fontSize: normalize(14),
          fontWeight: '400'
        }}
        >Workout Name</Text>
        
        <View style={{borderWidth:normalize(1),borderColor:'#33344f',
            backgroundColor:"#1d2039",
            paddingVertical:normalizeHeight(0),
            marginTop:normalizeHeight(5),
            borderRadius:normalize(6),
            paddingLeft:normalizeWidth(12)
        }}>
           <Text
           style={{
            fontWeight: '400',
            color: '#d2d0db',
            fontSize: normalize(16),
            paddingVertical: normalizeHeight(5)
           }}
           >{workoutDefaultName}</Text>
        </View>

        <Text
        style={{marginTop:normalizeHeight(10),
             color: '#acadba',
         fontSize: normalize(14),
          fontWeight: '400'
        }}
        >Exercises Performed</Text>
       
        <View style={{borderWidth:normalize(1),borderColor:'#33344f',
            backgroundColor:"#1d2039",
            paddingVertical:normalizeHeight(0),
            marginTop:normalizeHeight(5),
            borderRadius:normalize(6),
            paddingHorizontal:normalizeWidth(12)
        }}>
           {
             exercisesList.map((exercise,index)=>{
                const isLast = index === exercisesList.length -1;
                return (
                    <View style={[{flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center',
                        paddingVertical: normalizeHeight(6)
                    },
                    !isLast && {borderBottomWidth:normalize(1),
                        borderColor: '#31324f'
                    }
                    ]}>
                    <Text
                    style={{
                        color:'#cac9d5',
                        fontWeight: '400',
                        fontSize:normalize(14)
                    }}
                    >{exercise.name}</Text>
                    <Text
                    style={{
                        color:'#9496a7',
                        fontWeight: '400',
                        fontSize:normalize(14)
                    }}
                    >{exercise.sets} Sets</Text>
                    </View>
                )
             })
           }
        </View>


        <View style={{
            marginTop: normalizeHeight(16),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: normalizeHeight(16)
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#313967',
              borderRadius: normalize(8),
              paddingVertical: normalize(10),
              marginRight: normalize(4),
              alignItems: 'center',
              borderWidth: normalize(1),
              borderColor: '#536196',
            }}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Text style={{ color: '#e4e5ee', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Save Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#6c1e29',
              borderRadius: normalize(8),
              paddingVertical: normalize(10),
              marginLeft: normalize(4),
              alignItems: 'center',
              borderWidth: normalize(1),
              borderColor: '#a6353f',
            }}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Text style={{ color: '#F2F4F8', fontWeight: '500', fontSize: normalize(15), letterSpacing: 0.5 }}>Discard</Text>
          </TouchableOpacity>
        </View>
      
       

      </View>
    </View>
    </View>
  </Modal>
)
}

export default EndActiveWorkoutModal;
