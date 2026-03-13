import React from 'react';
import { View, Text } from 'react-native';
import { normalize } from '../utils/normalize';


// Separator dot component
const DotSeparator = () => (
    <Text style={{ color: '#c6cbda', marginHorizontal: 4, fontSize: normalize(14) }}>
        •
    </Text>
);

const DisplayForParam = ({ paramName, value }) => {
    if(paramName ==='Reps'){
        const repLabel = value === 1 ? 'rep' : 'reps';
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14),
            fontWeight:'500'
         }}>{value} {repLabel}</Text>;
    }
    if(paramName ==='Weight'){
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14),
             fontWeight:'500'
         }}>{value} kg</Text>;
    }
    if(paramName ==='Time'){
        // Assume value is in seconds, format as mm:ss
        if (typeof value === 'number' && !isNaN(value)) {
            const minutes = Math.floor(value / 60);
            const seconds = value % 60;
            return <Text style={{ color: '#c6cbda', fontSize: normalize(14) }}>{minutes}:{seconds.toString().padStart(2, '0')}</Text>;
        }
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14) }}>{value}</Text>;
    }
    return null;
}

// Placeholder for inline logged data display for an exercise set
const ExerciseLoggedDataInline = ({
    loggedData, params
}) => {

    console.log("ckck this function inside ld",loggedData,params)
    if (!loggedData) {
        return <Text style={{ color: '#888',
             fontStyle: 'italic' 
            }}>Click to Log</Text>;
    }

    const filteredParams = params.filter(param => {
       return param.name ==='Reps' || param.name ==='Weight' || param.name==='Time'
    });


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {filteredParams && filteredParams.map((param, idx) => (
                <React.Fragment key={param.id || idx}>
                    <DisplayForParam paramName={param.name } value={loggedData[param.name]} />
                    {idx < filteredParams.length - 1 && <DotSeparator />}
                </React.Fragment>
            ))}
        </View>
    );
};

export default ExerciseLoggedDataInline;
