import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { normalizeHeight } from '../utils/normalize';
import { databaseController } from '../data';
import RoutineCard from '../components/RoutineCard';

const RoutinesScreen = () => {
    const routines = databaseController.getAllRoutines();

    useEffect(() => {
        console.log("routines are ", routines)
    }, [])

    const renderItem = ({ item }) => {
        return (
            <RoutineCard routine = {item} />
        )
    }

    const renderSeparator = () => <View style={{ height: normalizeHeight(12) }} />;

    return (
        <View style={styles.bg}>
            <View style={{
                width: '100%', borderWidth: 1,
                borderColor: 'rgba(68, 75, 95)',
                alignItems: 'center',
                backgroundColor: 'rgba(36, 42, 65)',
                paddingTop: normalizeHeight(40),
                paddingBottom: normalizeHeight(12)
            }}>
                <Text
                    style={{
                        fontSize: 22,
                        letterSpacing: 1,
                        fontWeight: '700',
                        color: "#fefefe"
                    }}
                >Routines</Text>
            </View>
            <FlatList
                data={routines}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                contentContainerStyle={{ marginTop: normalizeHeight(20) }}
            />
        </View>)
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2238',
    }
});

export default RoutinesScreen;
