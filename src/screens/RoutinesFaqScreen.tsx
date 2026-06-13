import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';

const Divider = () => <View style={styles.divider} />;

const ScreenshotPlaceholder = ({ caption }: { caption: string }) => (
    <View style={styles.placeholderWrapper}>
        <View style={styles.placeholderBox}>
            <Text style={styles.placeholderLabel}>screenshot</Text>
            <Text style={styles.placeholderCaption}>{caption}</Text>
        </View>
    </View>
);

const CheckItem = ({ text }: { text: string }) => (
    <View style={styles.checkItem}>
        <View style={styles.checkMark}>
            <Text style={styles.checkMarkText}>✓</Text>
        </View>
        <Text style={styles.checkText}>{text}</Text>
    </View>
);

const BulletItem = ({ text }: { text: string }) => (
    <View style={styles.bulletItem}>
        <View style={styles.bulletDot} />
        <Text style={styles.bulletText}>{text}</Text>
    </View>
);

const SectionTitle = ({ children }: { children: string }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
);

const SubTitle = ({ children }: { children: string }) => (
    <Text style={styles.subTitle}>{children}</Text>
);

const RoutinesFaqScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <Image source={white_left_arrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Understanding Routines</Text>
                <View style={{ width: normalizeWidth(24) }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* What are Routines */}
                <Text style={styles.pageTitle}>What are Routines?</Text>
                <Text style={styles.body}>
                    A routine is a collection of exercises that you perform together during a workout.
                </Text>
                <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                    Think of a routine as a workout template that you can save and reuse whenever you train.
                </Text>

                <ScreenshotPlaceholder caption="Routine Details Screen — e.g. a Push Day routine with Bench Press, Shoulder Press, and Tricep Pushdowns." />

                <Divider />

                {/* Example Routine */}
                <SectionTitle>Example Routine</SectionTitle>
                <SubTitle>Push Day</SubTitle>
                <BulletItem text="Bench Press" />
                <BulletItem text="Incline Dumbbell Press" />
                <BulletItem text="Shoulder Press" />
                <BulletItem text="Tricep Pushdown" />
                <Text style={[styles.body, { marginTop: normalizeHeight(12) }]}>
                    This routine groups several upper-body pushing exercises into a single workout.
                </Text>

                <Divider />

                {/* Why Use Routines */}
                <SectionTitle>Why Use Routines?</SectionTitle>
                <CheckItem text="Start workouts faster" />
                <CheckItem text="Stay consistent between sessions" />
                <CheckItem text="Reuse your favourite workout plans" />
                <CheckItem text="Track progress across similar workouts" />

                <Divider />

                {/* Routine vs Exercise */}
                <SectionTitle>Routine vs Exercise</SectionTitle>

                <View style={styles.comparisonRow}>
                    <View style={[styles.comparisonCard, { marginRight: normalizeWidth(8) }]}>
                        <Text style={styles.comparisonCardTitle}>Exercise</Text>
                        <Text style={styles.comparisonCardSub}>A single movement</Text>
                        <View style={styles.comparisonDivider} />
                        <BulletItem text="Push-Up" />
                        <BulletItem text="Squat" />
                        <BulletItem text="Pull-Up" />
                        <BulletItem text="Deadlift" />
                    </View>
                    <View style={[styles.comparisonCard, { marginLeft: normalizeWidth(8) }]}>
                        <Text style={styles.comparisonCardTitle}>Routine</Text>
                        <Text style={styles.comparisonCardSub}>A collection of exercises</Text>
                        <View style={styles.comparisonDivider} />
                        <Text style={styles.comparisonRoutineName}>Push Day</Text>
                        <BulletItem text="Bench Press" />
                        <BulletItem text="Shoulder Press" />
                        <BulletItem text="Tricep Pushdown" />
                    </View>
                </View>

                <Divider />

                {/* Do I Need a Routine */}
                <SectionTitle>Do I Need a Routine?</SectionTitle>
                <Text style={styles.body}>
                    No.
                </Text>
                <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                    You can track workouts by selecting exercises individually. Routines simply make it faster when you regularly perform the same group of exercises.
                </Text>

                <Divider />

                {/* Managing Routines */}
                <SectionTitle>Managing Your Routines</SectionTitle>
                <Text style={styles.body}>
                    FitForge lets you create, edit, and customise routines at any time. Build routines that match your own training style, schedule, and goals.
                </Text>
                <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                    You can access and manage your routines from the Profile section.
                </Text>

                <ScreenshotPlaceholder caption="Profile → Routines — where routines can be created, edited, and organised." />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2238',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: normalizeHeight(46),
        paddingBottom: normalizeHeight(14),
        paddingHorizontal: normalizeWidth(16),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(68,75,95,1)',
        backgroundColor: 'rgba(36,42,65,1)',
    },
    backArrow: {
        width: normalizeWidth(9),
        height: normalizeWidth(9) * (86.0 / 51.0),
        resizeMode: 'stretch',
    },
    headerTitle: {
        color: '#fefefe',
        fontSize: normalize(20),
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    content: {
        paddingHorizontal: normalizeWidth(20),
        paddingTop: normalizeHeight(28),
        paddingBottom: normalizeHeight(60),
    },
    pageTitle: {
        color: '#fefefe',
        fontSize: normalize(22),
        fontWeight: '700',
        letterSpacing: 0.3,
        marginBottom: normalizeHeight(12),
    },
    body: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: normalize(14),
        lineHeight: normalize(22),
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginVertical: normalizeHeight(24),
    },
    sectionTitle: {
        color: '#fefefe',
        fontSize: normalize(17),
        fontWeight: '600',
        marginBottom: normalizeHeight(14),
    },
    subTitle: {
        color: '#7fb3ff',
        fontSize: normalize(14),
        fontWeight: '600',
        marginBottom: normalizeHeight(8),
    },
    // Screenshot placeholder
    placeholderWrapper: {
        marginTop: normalizeHeight(16),
        marginBottom: normalizeHeight(4),
    },
    placeholderBox: {
        backgroundColor: '#252d47',
        borderWidth: 1,
        borderColor: '#3d4563',
        borderRadius: normalize(12),
        borderStyle: 'dashed',
        paddingVertical: normalizeHeight(32),
        paddingHorizontal: normalizeWidth(16),
        alignItems: 'center',
    },
    placeholderLabel: {
        color: 'rgba(255,255,255,0.25)',
        fontSize: normalize(11),
        fontWeight: '500',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: normalizeHeight(8),
    },
    placeholderCaption: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: normalize(12),
        textAlign: 'center',
        lineHeight: normalize(18),
    },
    // Check items
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalizeHeight(10),
    },
    checkMark: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        backgroundColor: 'rgba(74,200,120,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(74,200,120,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: normalizeWidth(12),
    },
    checkMarkText: {
        color: '#4ac878',
        fontSize: normalize(11),
        fontWeight: '700',
    },
    checkText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: normalize(14),
    },
    // Bullet items
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalizeHeight(6),
    },
    bulletDot: {
        width: normalize(5),
        height: normalize(5),
        borderRadius: normalize(3),
        backgroundColor: '#7fb3ff',
        marginRight: normalizeWidth(10),
    },
    bulletText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: normalize(14),
    },
    // Comparison cards
    comparisonRow: {
        flexDirection: 'row',
    },
    comparisonCard: {
        flex: 1,
        backgroundColor: '#252d47',
        borderWidth: 1,
        borderColor: '#3d4563',
        borderRadius: normalize(12),
        padding: normalize(14),
    },
    comparisonCardTitle: {
        color: '#fefefe',
        fontSize: normalize(14),
        fontWeight: '600',
        marginBottom: normalizeHeight(4),
    },
    comparisonCardSub: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: normalize(11),
        marginBottom: normalizeHeight(10),
    },
    comparisonDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginBottom: normalizeHeight(10),
    },
    comparisonRoutineName: {
        color: '#7fb3ff',
        fontSize: normalize(13),
        fontWeight: '600',
        marginBottom: normalizeHeight(6),
    },
});

export default RoutinesFaqScreen;
