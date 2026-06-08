import React from 'react';
import { EditExerciseComponent } from '../components';

const AddExerciseScreen = ({ navigation, route }: any) => {
    return (
        <EditExerciseComponent navigation={navigation} route={route} isAddExerciseScreen={true} />
    );
};

export default AddExerciseScreen;
