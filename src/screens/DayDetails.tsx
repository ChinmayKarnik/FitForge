
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import white_left_arrow from '../images/white-left-arrow.png';
import clock2 from '../images/clock-2.png';
import slant_dumbbell from '../images/slant-dumbbell.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getWorkoutsForADay } from '../utils/workoutUtils';
import { WorkoutSummaryCard } from '../components/WorkoutSummaryCard';

export const DayDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const date = route.params?.date;
    let dateText = '';
    if (date) {
        const d = new Date(date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[d.getDay()];
        const monthName = d.toLocaleString('default', { month: 'long' });
        dateText = `${dayName} - ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
    }
    

    const workouts = getWorkoutsForADay(date);

    const numberOfWorkouts = workouts.length;
    const totalDurationMins = workouts.reduce((sum, workout) => {
        if (workout.startTime && workout.endTime) {
            return sum + Math.round((workout.endTime - workout.startTime) / 60000);
        }
        return sum;
    }, 0);

    const renderWorkoutItem = ({ item }: { item: any }) => (
        <WorkoutSummaryCard
            workout={item}
            onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
            disableHorizontalMargin={true}
        />
    );

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    hitSlop={{ top: normalizeHeight(20), bottom: normalizeHeight(20), left: normalizeWidth(20), right: normalizeWidth(20) }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.backIcon}
                        source={white_left_arrow}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Day Details</Text>
            </View>

            <View style={styles.container}>
                {/* Date Display */}
                <Text style={styles.dateText}>{dateText}</Text>

                {/* Stats Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Image source={slant_dumbbell} style={styles.dumbbellIcon} />
                        <View style={styles.statContent}>
                            <Text style={styles.statValue}>{numberOfWorkouts}</Text>
                            <Text style={styles.statLabel}>{numberOfWorkouts === 1 ? 'Workout' : 'Workouts'}</Text>
                        </View>
                    </View>


                    <View style={styles.statItem}>
                        <Image source={clock2} style={styles.clockIcon} />
                        <View style={styles.statContent}>
                            <Text style={styles.statValue}>{totalDurationMins} Min</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                    </View>
                </View>

                {/* Workouts Title */}
                <Text style={styles.workoutsTitle}>Workouts</Text>

                {/* Workouts List */}
                <FlatList
                    data={workouts}
                    renderItem={renderWorkoutItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: normalizeHeight(12) }} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'rgba(36, 42, 65)',
    },
    header: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(68, 75, 95)',
        alignItems: 'center',
        backgroundColor: 'rgba(36, 42, 65)',
        paddingTop: normalizeHeight(40),
        paddingBottom: normalizeHeight(12),
        position: 'relative',
    },
    headerTitle: {
        fontSize: normalize(18),
        letterSpacing: 1,
        fontWeight: '700',
        color: "#fefefe"
    },
    backButton: {
        position: 'absolute',
        top: normalizeHeight(46),
        left: normalizeWidth(16),
    },
    backIcon: {
        width: normalizeWidth(9),
        height: normalizeWidth(9) * (86.0 / 51.0),
        aspectRatio: 51.0 / 86.0,
        resizeMode: 'stretch',
    },
    container: {
        flex: 1,
        paddingHorizontal: normalizeWidth(16),
        paddingTop: normalizeHeight(20),
    },
    dateText: {
        fontSize: normalize(24),
        fontWeight: '700',
        color: '#fefefe',
        textAlign: 'center',
        marginBottom: normalizeHeight(24),
    },
    statsCard: {
        backgroundColor: '#2b2c41',
        borderRadius: normalize(12),
        borderWidth: normalize(2),
        borderColor: '#556179',
        paddingVertical: normalizeHeight(20),
        paddingHorizontal: normalizeWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalizeWidth(12),
    },
    iconPlaceholder: {
        width: normalizeWidth(40),
        height: normalizeWidth(40),
        backgroundColor: '#353c58',
        borderRadius: normalize(8),
    },
    statContent: {
        flex: 1,
    },
    statValue: {
        fontSize: normalize(18),
        fontWeight: '700',
        color: '#d1514c',
        marginBottom: normalizeHeight(4),
    },
    statLabel: {
        fontSize: normalize(15),
        color: '#d0d0db',
        fontWeight: '500',
    },
    statDivider: {
        width: normalize(1),
        height: normalizeHeight(50),
        backgroundColor: '#353c58',
        marginHorizontal: normalizeWidth(16),
    },
    clockIcon: {
        height: normalizeHeight(45),
        aspectRatio: (304.0 / 351.0),
        width: normalizeHeight(45) * (304.0 / 351.0),
        resizeMode: 'contain',
    },
    dumbbellIcon: {
        height: normalizeHeight(45),
        aspectRatio: (660.0 / 592.0),
        width: normalizeHeight(45) * (660.0 / 592.0),
        resizeMode: 'contain',
    },
    workoutsTitle: {
        fontSize: normalize(20),
        fontWeight: '700',
        color: '#fefefe',
        textAlign: 'center',
        marginTop: normalizeHeight(24),
        marginBottom: normalizeHeight(16),
    },
});
