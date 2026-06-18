import React, { useRef } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Divider = () => {
    return (<View
        style={{
            width: '100%',
            height: normalizeHeight(1),
            backgroundColor: 'rgba(68, 75, 95, 0.5)',
        }}
    />)
}

const EditNameModal = ({ visible, value, onCancel, onSave }) => {
    const inputRef = useRef<TextInput>(null);
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        if (visible) setLocalValue(value);
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onCancel}
            onShow={() => { setTimeout(() => inputRef.current?.focus(), 100); }}
        >
            <View style={styles.overlay}>
                <View style={{
                    width: '88%',
                    backgroundColor: '#243250',
                    borderRadius: normalize(20),
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                }}>
                    <Text style={{
                        fontSize: normalize(18),
                        fontWeight: '600',
                        letterSpacing: 0.5,
                        color: '#f9f9f9',
                        marginVertical: normalizeHeight(12)
                    }}>Edit Name</Text>

                    <Divider />
                    <View style={{ width: '100%' }}>
                        <TextInput
                            ref={inputRef}
                            style={
                                {
                                    borderWidth: normalize(1),
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: normalize(12),
                                    padding: normalizeHeight(12),
                                    fontSize: normalize(16),
                                    color: '#e8ecf6',
                                    backgroundColor: '#1a2240',
                                    marginVertical: normalizeHeight(10),
                                    marginHorizontal: normalizeWidth(16),
                                }
                            }
                            value={localValue}
                            onChangeText={setLocalValue}
                            placeholder="Enter your name"
                            placeholderTextColor="rgba(255,255,255,0.35)"
                            returnKeyType="done"
                        />
                    </View>
                    <Divider />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginRight: normalizeWidth(8),
                                backgroundColor: localValue.trim().length > 0 ? '#3d6fe0' : 'rgba(61, 111, 224, 0.2)',
                                width: normalizeWidth(130),
                                borderRadius: normalize(10),
                                paddingVertical: normalizeHeight(10),
                                alignItems: 'center',
                                marginBottom: normalizeHeight(8),
                            }}
                            disabled={localValue.trim().length === 0}
                            onPress={() => { onSave(localValue) }}
                        >
                            <Text style={[styles.saveText, localValue.trim().length === 0 && { color: 'rgba(255,255,255,0.3)' }]}>Save</Text>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.25,
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
        color: 'rgba(255,255,255,0.9)',
        fontSize: normalize(16),
        fontWeight: '500',
    },
    saveText: {
        color: '#fff',
        fontSize: normalize(16),
        fontWeight: '600',
    },
});

export default EditNameModal;
