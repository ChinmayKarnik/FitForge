import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Divider = () => (
    <View style={{ width: '100%', height: normalizeHeight(1), backgroundColor: '#3b4572' }} />
);

const EditBioModal = ({ visible, value, onCancel, onSave }) => {
    const inputRef = useRef(null);
    const [localValue, setLocalValue] = React.useState(value);

    useEffect(() => {
        if (visible) setLocalValue(value);
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={{
                        fontSize: normalize(18),
                        fontWeight: '500',
                        letterSpacing: 0.7,
                        color: '#b9bfd4',
                        marginVertical: normalizeHeight(12),
                    }}>Edit Bio</Text>

                    <Divider />
                    <View style={{ width: '100%' }}>
                        <TextInput
                            ref={inputRef}
                            style={{
                                borderWidth: normalize(1),
                                borderColor: '#4472c4',
                                borderRadius: 8,
                                padding: normalizeHeight(12),
                                fontSize: normalize(15),
                                color: '#c1c1d0',
                                backgroundColor: '#23253A',
                                marginVertical: normalizeHeight(10),
                                marginHorizontal: normalizeWidth(16),
                                minHeight: normalizeHeight(80),
                                textAlignVertical: 'top',
                            }}
                            value={localValue}
                            onChangeText={setLocalValue}
                            placeholder="Enter your bio"
                            placeholderTextColor="#a5a7c1"
                            returnKeyType="default"
                            multiline
                            autoFocus
                        />
                    </View>
                    <Divider />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, localValue.trim().length === 0 && { backgroundColor: '#1e2545' }]}
                            disabled={localValue.trim().length === 0}
                            onPress={() => onSave(localValue)}
                        >
                            <Text style={[styles.saveText, localValue.trim().length === 0 && { color: '#555a7a' }]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.32)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.25,
    },
    card: {
        width: '90%',
        backgroundColor: '#232d5a',
        borderRadius: normalize(18),
        borderWidth: normalize(1),
        borderColor: '#2f3961',
        alignItems: 'center',
        elevation: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: normalizeHeight(8),
    },
    cancelButton: {
        marginLeft: normalizeWidth(10),
        width: normalizeWidth(130),
        paddingVertical: normalizeHeight(6),
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginBottom: normalizeHeight(8),
    },
    cancelText: {
        color: '#a5a7c1',
        fontSize: normalize(16),
        fontWeight: '500',
    },
    saveButton: {
        marginRight: normalizeWidth(8),
        backgroundColor: '#2752b2',
        width: normalizeWidth(130),
        borderRadius: normalize(30),
        paddingVertical: normalizeHeight(6),
        alignItems: 'center',
        marginBottom: normalizeHeight(8),
    },
    saveText: {
        color: '#fff',
        fontSize: normalize(16),
        fontWeight: '600',
    },
});

export default EditBioModal;
