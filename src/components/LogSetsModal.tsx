import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { normalizeHeight, normalizeWidth, normalize } from '../utils/normalize';
import ExerciseForm from './ExerciseForm';
import { databaseController } from '../data/controllers';

interface LogSetsModalProps {
    visible: boolean;
    onClose: () => void;
    exerciseId: string;
    setIdx: number;
    initialData?: Record<string, any> | null;
    onSave: (setIdx: number, exerciseId: string, loggedData: Record<string, any>) => void;
}

export const LogSetsModal = ({ visible, onClose, exerciseId, setIdx, onSave, initialData }: LogSetsModalProps) => {
    const exercise = databaseController.getExerciseById(exerciseId);
    const exerciseName = exercise?.name;

    const [loggedData, setLoggedData] = useState(initialData || {})

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onClose}
            >
                {/* Container */}
                <View 
                    style={styles.container}
                    onStartShouldSetResponder={() => true}
                >
                    <ExerciseForm
                        exerciseName={exerciseName}
                        onCloseForm={onClose}
                        exerciseId={exerciseId}
                        onFormDataChange={setLoggedData}
                        initialData={initialData}
                        onSave={() => {onSave(setIdx, exerciseId, loggedData);
                            onClose();
                        }}
                        onDiscard={onClose}
                        setNumber={setIdx + 1}
                        removeHorizontalMargin={true}
                        shouldUseKAV = {false}
                        showBorder = {false}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};


const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.2,
    },
    container: {
        backgroundColor: '#1c2238',
        borderRadius: normalize(16),
        width: '90%',
    },
});
