import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, ScrollView } from 'react-native';
import { databaseController } from '../data';

const AddExerciseModal = ({ onClose, addSetsForExercise }) => {
  const exercises = databaseController.getAllExercises();
  const [step, setStep] = useState<'choose' | 'sets' | 'params' | 'summary'>('choose');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [numSets, setNumSets] = useState('1');
  const [rest, setRest] = useState('60');
  const [setParams, setSetParams] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);

  const onSave = ()=>{
    console.log("ckck data available before save is ",
        setParams, currentSet,selectedExercise
    )
    addSetsForExercise(selectedExercise,{
        numberOfSets:numSets,
        restTimeBetweenSets: Number(rest)*(1000)
    },setParams)
    onClose()
  }
console.log('exercises',exercises)
  // Step 1: Choose exercise
  if (step === 'choose') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Exercise</Text>
        {exercises.length === 0 ? (
          <Text style={styles.text}>No exercises found.</Text>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.exerciseItem, selectedExercise?.id === item.id && styles.selectedExerciseItem]}
                onPress={() => { setSelectedExercise(item); setStep('sets'); }}
              >
                <Text style={styles.exerciseName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={{ width: '100%', maxHeight: 300 }}
          />
        )}
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 2: Choose sets and rest
  if (step === 'sets') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>How many sets?</Text>
        <TextInput
          style={styles.input}
          placeholder="Number of sets"
          value={numSets}
          onChangeText={setNumSets}
          keyboardType="numeric"
        />
        <Text style={styles.title}>Rest between sets (seconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="Rest time"
          value={rest}
          onChangeText={setRest}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            setSetParams(Array(Number(numSets)).fill({}));
            setCurrentSet(0);
            setStep('params');
          }}
        >
          <Text style={styles.saveButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 3: Enter parameters for each set
  if (step === 'params') {
    const params = selectedExercise?.requiredParameters || [
      { name: 'reps', label: 'Reps', type: 'number' },
      { name: 'weight', label: 'Weight', type: 'number' },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Set {currentSet + 1} of {numSets}</Text>
        <ScrollView style={{ width: '100%' }}>
          {params.map(param => (
            <View key={param.name} style={{ marginBottom: 12 }}>
              <Text style={styles.inputLabel}>{param.label || param.name}</Text>
              <TextInput
                style={styles.input}
                placeholder={param.label || param.name}
                value={setParams[currentSet]?.[param.name] || ''}
                onChangeText={val => {
                  const updated = [...setParams];
                  updated[currentSet] = { ...updated[currentSet], [param.name]: val };
                  setSetParams(updated);
                }}
                keyboardType={param.type === 'number' ? 'numeric' : 'default'}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            if (currentSet + 1 < Number(numSets)) {
              setCurrentSet(currentSet + 1);
            } else {
              setStep('summary');
            }
          }}
        >
          <Text style={styles.saveButtonText}>{currentSet + 1 < Number(numSets) ? 'Next Set' : 'Finish'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 4: Print summary
  if (step === 'summary') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Summary</Text>
        <Text style={styles.text}>Exercise: {selectedExercise?.name}</Text>
        <Text style={styles.text}>Sets: {numSets}</Text>
        <Text style={styles.text}>Rest: {rest} sec</Text>
        <Text style={styles.text}>Set Details:</Text>
        <ScrollView style={{ width: '100%' }}>
          {setParams.map((set, idx) => (
            <Text key={idx} style={styles.text}>Set {idx + 1}: {JSON.stringify(set)}</Text>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={onSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  exerciseItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  selectedExerciseItem: {
    backgroundColor: '#e6f7ff',
  },
  exerciseName: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    width: '100%',
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#f44f4f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddExerciseModal;
