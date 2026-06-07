import React from 'react';
import { EditRoutineComponent } from '../components';

const AddRoutineScreen = ({ navigation, route }: any) => {
    return (
        <EditRoutineComponent navigation={navigation} route={route} isAddRoutineScreen={true} />
    );
};

export default AddRoutineScreen;
