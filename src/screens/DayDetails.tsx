
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import white_left_arrow from '../images/white-left-arrow.png';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import { getWorkoutsForADay } from '../utils/workoutUtils';
import { WorkoutSummaryCard } from '../components/WorkoutSummaryCard';

export const DayDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const date = route.params?.date;
    let dayName = '';
    let dateText = '';
    if (date) {
        const d = new Date(date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayName = days[d.getDay()];
        const monthName = d.toLocaleString('default', { month: 'long' });
        dateText = `${monthName} ${d.getDate()}, ${d.getFullYear()}`;
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
                {/* TOP SECTION */}
                <View style={styles.topSection}>
                    <View style={styles.bracketTopLeft} />
                    <View style={styles.bracketBottomRight} />
                    <Text style={styles.dayNameText}>{dayName}</Text>
                    <Text style={styles.dateLabel}>{dateText}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statCol}>
                            <Text style={styles.statNum}>{numberOfWorkouts}</Text>
                            <Text style={styles.statLbl}>WORKOUTS</Text>
                        </View>
                        <View style={styles.statVertDivider} />
                        <View style={styles.statCol}>
                            <Text style={styles.statNum}>{totalDurationMins}</Text>
                            <Text style={styles.statLbl}>MIN</Text>
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
        backgroundColor: '#1c2238',
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
    topSection: {
        position: 'relative',
        paddingTop: normalizeHeight(26),
        paddingBottom: normalizeHeight(24),
        paddingLeft: normalizeWidth(18),
    },
    bracketTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: normalizeWidth(68),
        height: normalizeHeight(68),
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: 'rgba(127,179,255,0.6)',
    },
    bracketBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: normalizeWidth(68),
        height: normalizeHeight(68),
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(127,179,255,0.6)',
    },
    dayNameText: {
        fontSize: normalize(38),
        fontWeight: '800',
        color: '#fefefe',
        letterSpacing: -0.5,
        textTransform: 'uppercase',
        marginBottom: normalizeHeight(4),
    },
    dateLabel: {
        fontSize: normalize(18),
        fontWeight: '500',
        color: 'rgba(255,255,255,0.65)',
        marginBottom: normalizeHeight(20),
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statCol: {
        paddingRight: normalizeWidth(20),
    },
    statVertDivider: {
        width: 1.5,
        height: normalizeHeight(38),
        backgroundColor: 'rgba(255,255,255,0.25)',
        marginRight: normalizeWidth(20),
    },
    statNum: {
        fontSize: normalize(27),
        fontWeight: '700',
        color: '#7fb3ff',
        lineHeight: normalize(30),
    },
    statLbl: {
        fontSize: normalize(10),
        fontWeight: '500',
        color: '#808cbd',
        letterSpacing: 0.8,
        marginTop: normalizeHeight(2),
    },
    workoutsTitle: {
        fontSize: normalize(14),
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 0.4,
        marginTop: normalizeHeight(20),
        marginBottom: normalizeHeight(10),
    },
});
