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
        const displayValue = value || value === 0 ? value : 0;
        const repLabel = displayValue === 1 ? 'rep' : 'reps';
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14),
            fontWeight:'500'
         }}>{displayValue} {repLabel}</Text>;
    }
    if(paramName ==='Weight'){
        const displayValue = value || value === 0 ? value : 0;
        if (!displayValue) return null;
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14),
             fontWeight:'500'
         }}>{displayValue} kg</Text>;
    }
    if(paramName ==='Time'){
        // Assume value is in seconds, format as mm:ss
        const displayValue = value || value === 0 ? value : 0;
        if (typeof displayValue === 'number' && !isNaN(displayValue)) {
            const minutes = Math.floor(displayValue / 60);
            const seconds = displayValue % 60;
            return <Text style={{ color: '#c6cbda', fontSize: normalize(14) }}>{minutes}:{seconds.toString().padStart(2, '0')}</Text>;
        }
        return <Text style={{ color: '#c6cbda', fontSize: normalize(14) }}>{displayValue}</Text>;
    }
    return null;
}

// Placeholder for inline logged data display for an exercise set
const ExerciseLoggedDataInline = ({
    loggedData, params
}) => {

    if (!loggedData) {
        return <Text style={{ color: '#888',
             fontStyle: 'italic' 
            }}>Click to Log</Text>;
    }

    const visibleParams = params.filter(param => {
        if (param.name === 'Reps' || param.name === 'Time') return true;
        if (param.name === 'Weight') {
            const val = loggedData[param.name];
            const displayValue = val || val === 0 ? val : 0;
            return !!displayValue;
        }
        return false;
    });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {visibleParams.map((param, idx) => (
                <React.Fragment key={param.id || idx}>
                    <DisplayForParam paramName={param.name} value={loggedData[param.name]} />
                    {idx < visibleParams.length - 1 && <DotSeparator />}
                </React.Fragment>
            ))}
        </View>
    );
};

export default ExerciseLoggedDataInline;
