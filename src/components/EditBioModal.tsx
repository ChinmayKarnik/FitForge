import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, InteractionManager } from 'react-native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';

const Divider = () => {
    return (<View
        style={{
            width: '100%',
            height: normalizeHeight(1),
            backgroundColor: '#3b4572',
        }}
    />)
}

const EditBioModal = ({ visible, value, onChangeText, onCancel, onSave }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (visible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onCancel}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
            >
                <View style={{
                    width: '90%',
                    backgroundColor: '#232d5a',
                    borderRadius: normalize(18),
                    borderWidth: normalize(1),
                    borderColor: '#2f3961',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <Text style={{
                        fontSize: normalize(18),
                        fontWeight: '500',
                        letterSpacing: 0.7,
                        color: '#b9bfd4',
                        marginVertical: normalizeHeight(12)
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
                            value={value}
                            onChangeText={onChangeText}
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
                        <TouchableOpacity style={{
                            marginRight: normalizeWidth(8),
                            backgroundColor: '#2752b2',
                            width: normalizeWidth(130),
                            borderRadius: normalize(30),
                            paddingVertical: normalizeHeight(6),
                            alignItems: 'center',
                            marginBottom: normalizeHeight(8),
                        }} onPress={() => { onSave(value) }}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.32)',
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
    saveText: {
        color: '#fff',
        fontSize: normalize(16),
        fontWeight: '600',
    },
});

export default EditBioModal;
