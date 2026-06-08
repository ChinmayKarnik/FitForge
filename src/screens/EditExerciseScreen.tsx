import React from 'react';
import { EditExerciseComponent } from '../components';

const EditExerciseScreen = ({ navigation, route }: any) => {
    return (
        <EditExerciseComponent navigation={navigation} route={route} isAddExerciseScreen={false} />
    );
};

export default EditExerciseScreen;
