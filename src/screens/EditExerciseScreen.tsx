import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { databaseController } from '../data';
import white_left_arrow from '../images/white-left-arrow.png';

const EditExerciseScreen = ({ navigation, route }: any) => {
    const { exercise: initialExercise } = route.params;
    const [exercise, setExercise] = useState({
        name: initialExercise.name || '',
        description: initialExercise.description || '',
    });
    const [parameters, setParameters] = useState(() => {
        const paramMap = { reps: false, weight: false, toFailure: false, time: false };
        if (Array.isArray(initialExercise.requiredParameters)) {
            initialExercise.requiredParameters.forEach((param: any) => {
                if (param.name === 'Reps') paramMap.reps = true;
                if (param.name === 'Weight') paramMap.weight = true;
                if (param.name === 'To Failure') paramMap.toFailure = true;
                if (param.name === 'Time') paramMap.time = true;
            });
        }
        return paramMap;
    });

    const isExerciseValid =
        exercise.name &&
        exercise.name.trim() !== '' &&
        exercise.description &&
        exercise.description.trim() !== '';

    const onCancelExercise = () => {
        navigation.goBack();
    };

    const onUpdateExercise = async () => {
        let exerciseToUpdate = { ...exercise };
        const requiredParameters = [];
        if (parameters.reps) {
            requiredParameters.push({ name: 'Reps', type: 'number', moreIsBetter: true });
        }
        if (parameters.weight) {
            requiredParameters.push({ name: 'Weight', type: 'number', moreIsBetter: true });
        }
        if (parameters.toFailure) {
            requiredParameters.push({ name: 'To Failure', type: 'boolean' });
        }
        if (parameters.time) {
            requiredParameters.push({ name: 'Time', type: 'number', moreIsBetter: true });
        }
        if (requiredParameters.length > 0) {
            exerciseToUpdate.requiredParameters = requiredParameters;
        }
        try {
            await databaseController.updateExercise(initialExercise.id, exerciseToUpdate);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
    };

    const toggleParameter = (param: keyof typeof parameters) => {
        setParameters({ ...parameters, [param]: !parameters[param] });
    };


};


export default EditExerciseScreen;
