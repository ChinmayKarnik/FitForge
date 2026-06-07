import React from 'react';
import { EditRoutineComponent } from '../components';

const EditRoutineScreen = ({ navigation, route }: any) => {
    return (
        <EditRoutineComponent navigation={navigation} route={route} isAddRoutineScreen={false} />
    );
};

export default EditRoutineScreen;
