import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = SCREEN_WIDTH - normalizeWidth(40);
import faq_routine_details from '../images/faq-routine-details.png';
import faq_routines_list from '../images/faq-routines-list.png';

const Divider = ({ style }: { style?: object }) => <View style={[styles.divider, style]} />;

const INNER_IMAGE_WIDTH = IMAGE_WIDTH - normalizeWidth(16);

const ScreenshotImage = ({ source, aspectRatio, caption }: { source: any; aspectRatio: number; caption?: React.ReactNode }) => (
    <View>
        <View style={styles.screenshotWrapper}>
            <View style={styles.screenshotImageClip}>
                <Image
                    source={source}
                    style={{ width: INNER_IMAGE_WIDTH, height: INNER_IMAGE_WIDTH / aspectRatio }}
                    resizeMode="cover"
                />
            </View>
        </View>
        {caption && <Text style={styles.screenshotCaption}>{caption}</Text>}
    </View>
);

const BenefitItem = ({ title, description }: { title: string; description: string }) => (
    <View style={styles.benefitItemRow}>
        <View style={styles.benefitSegmentRail} />
        <View style={styles.benefitItemContent}>
            <Text style={styles.benefitTitle}>{title}</Text>
            <Text style={styles.benefitDescription}>{description}</Text>
        </View>
    </View>
);


const SectionTitle = ({ children }: { children: string }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
);

const SectionRailBlock = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.railBlock}>
        <View style={styles.railBar} />
        <View style={styles.railContent}>
            {children}
        </View>
    </View>
);


const RoutinesFaqScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <Image source={white_left_arrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Routines</Text>
                <View style={{ width: normalizeWidth(24) }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* What are Routines */}
                <SectionTitle>What are Routines?</SectionTitle>
                <SectionRailBlock>
                    <Text style={styles.body}>
                        A routine is a collection of exercises that you perform together during a workout. Think of it as a workout template you can save and reuse whenever you train.
                    </Text>
                </SectionRailBlock>

                <View style={{ marginTop: normalizeHeight(20) }}>
                    <ScreenshotImage
                        source={faq_routine_details}
                        aspectRatio={696 / 976}
                        caption={<>{'An example '}<Text style={{ color: 'rgba(255,255,255,0.78)', fontWeight: '600' }}>Push Day</Text>{' routine comprising the exercises '}<Text style={{ color: 'rgba(255,255,255,0.78)', fontWeight: '600' }}>Bench Press</Text>{', '}<Text style={{ color: 'rgba(255,255,255,0.78)', fontWeight: '600' }}>Shoulder Press</Text>{' and '}<Text style={{ color: 'rgba(255,255,255,0.78)', fontWeight: '600' }}>Tricep Pushdown</Text></>}
                    />
                </View>

                <Divider style={{ marginTop: normalizeHeight(14) }} />

                {/* Routine vs Exercise */}
                <SectionTitle>Exercise vs Routine</SectionTitle>

                <View style={styles.flowDiagram}>
                    {/* Exercise block — card */}
                    <View style={styles.exerciseCard}>
                        <View style={styles.exerciseAccentBar} />
                        <View style={styles.exerciseCardContent}>
                            <View style={styles.exerciseTypePill}>
                                <Text style={styles.exerciseTypeLabel}>EXERCISE</Text>
                            </View>
                            <Text style={styles.exerciseCardName}>Bench Press</Text>
                        </View>
                        <View style={styles.exerciseInnerDivider} />
                        <View style={styles.exerciseDescription}>
                            <View style={styles.exerciseMetaRow}>
                                <View style={styles.exerciseMetaDot} />
                                <Text style={styles.exerciseMetaText}>A single movement</Text>
                            </View>
                        </View>
                    </View>

                    {/* Routine block — card */}
                    <View style={styles.routineContainer}>
                        <View style={styles.routineAccentBar} />
                        <View style={styles.routineContainerHeader}>
                            <View style={styles.routineTypePill}>
                                <Text style={styles.routineTypeLabel}>ROUTINE</Text>
                            </View>
                            <Text style={styles.routineContainerName}>Push Day</Text>
                            <Text style={styles.routineMetadata}>3 exercises</Text>
                        </View>
                        <View style={styles.routineInnerDivider} />
                        <View style={styles.routineExerciseList}>
                            {['Bench Press', 'Shoulder Press', 'Tricep Pushdown'].map((name, i, arr) => (
                                <View key={name} style={[styles.routineExerciseRow, i < arr.length - 1 && { marginBottom: normalizeHeight(4) }]}>
                                    <View style={styles.routineExerciseBullet} />
                                    <Text style={styles.routineExerciseName}>{name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <Divider />

                {/* Why Use Routines */}
                <SectionTitle>Why Use Routines?</SectionTitle>
                <View style={styles.benefitsList}>
                    <BenefitItem
                        title="Start workouts faster"
                        description="Your exercise list is ready to go. No searching, no setup."
                    />
                    <BenefitItem
                        title="Build a consistent habit"
                        description="Same structure each session makes effort easier to measure."
                    />
                    <BenefitItem
                        title="Reuse what works"
                        description="Save once. Use it until your goals change."
                    />
                    <BenefitItem
                        title="Compare progress accurately"
                        description="Like-for-like sessions make progress comparisons meaningful."
                    />
                </View>

                <Divider />

                {/* Do I Need a Routine */}
                <SectionTitle>Do I Need a Routine?</SectionTitle>
                <SectionRailBlock>
                    <Text style={styles.body}>
                        No. You can track workouts by selecting exercises individually. Routines simply make it faster when you regularly perform the same group of exercises.
                    </Text>
                </SectionRailBlock>

                <Divider />

                {/* Managing Routines */}
                <SectionTitle>Managing Your Routines</SectionTitle>
                <SectionRailBlock>
                    <Text style={styles.body}>
                        FitForge lets you create, edit, and customise routines at any time. Build routines that match your training style, schedule, and goals.
                    </Text>
                    <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                        You can access and manage your routines from the Routines section.
                    </Text>
                </SectionRailBlock>

                <ScreenshotImage source={faq_routines_list} aspectRatio={712 / 1568} />

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
        fontSize: normalize(18),
        fontWeight: '700',
        letterSpacing: 0.3,
        flex: 1,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: normalizeWidth(20),
        paddingTop: normalizeHeight(28),
        paddingBottom: normalizeHeight(60),
    },
    pageTitle: {
        color: '#ffffff',
        fontSize: normalize(29),
        fontWeight: '800',
        fontFamily: 'serif',
        letterSpacing: -0.6,
        lineHeight: normalize(36),
        marginBottom: normalizeHeight(24),
    },
    body: {
        color: 'rgba(255, 255, 255, 0.92)',
        fontSize: normalize(14),
        lineHeight: normalize(28),
        fontFamily: 'NunitoSans-Regular',
        letterSpacing: 0.1,
    },
    bodySecondary: {
        color: 'rgba(255, 255, 255, 0.68)',
        fontSize: normalize(14),
        lineHeight: normalize(26),
        fontFamily: 'NunitoSans-Regular',
        letterSpacing: 0.1,
    },
    bodyEmphasis: {
        color: 'rgba(255, 255, 255, 0.92)',
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: normalizeHeight(26),
    },
    sectionTitle: {
        color: '#fefefe',
        fontSize: normalize(21),
        fontWeight: '700',
        fontFamily: 'serif',
        letterSpacing: -0.3,
        lineHeight: normalize(28),
        marginBottom: normalizeHeight(22),
    },
    railBlock: {
        flexDirection: 'row',
    },
    railBar: {
        width: 2,
        backgroundColor: 'rgba(79, 126, 232, 0.45)',
        borderRadius: 2,
        alignSelf: 'stretch',
        marginBottom: normalizeHeight(6),
    },
    railContent: {
        flex: 1,
        paddingLeft: normalizeWidth(10),
    },
    subTitle: {
        color: '#7fb3ff',
        fontSize: normalize(14),
        fontWeight: '600',
        marginBottom: normalizeHeight(8),
    },
    // Screenshot
    screenshotWrapper: {
        marginTop: normalizeHeight(14),
        borderRadius: normalize(14),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.13)',
        padding: normalize(6),
        backgroundColor: '#171f36',
    },
    screenshotImageClip: {
        borderRadius: normalize(8),
        overflow: 'hidden',
    },
    screenshotCaption: {
        color: 'rgba(255,255,255,0.42)',
        fontSize: normalize(11),
        fontStyle: 'italic',
        lineHeight: normalize(17),
        marginTop: normalizeHeight(10),
        textAlign: 'center',
        paddingHorizontal: normalize(8),
    },
    // Q&A pattern
    qaRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: normalizeHeight(6),
    },
    qaLabel: {
        color: 'rgba(255,255,255,0.38)',
        fontSize: normalize(12),
        fontWeight: '400',
    },
    qaAnswer: {
        color: '#ffffff',
        fontSize: normalize(15),
        fontWeight: '700',
        fontFamily: 'serif',
    },
    // Benefit items
    benefitsList: {
        gap: normalizeHeight(36),
    },
    benefitItemRow: {
        flexDirection: 'row',
    },
    benefitSegmentRail: {
        width: 2,
        backgroundColor: 'rgba(79, 126, 232, 0.45)',
        borderRadius: 2,
        alignSelf: 'stretch',
    },
    benefitItemContent: {
        flex: 1,
        paddingLeft: normalizeWidth(6),
    },
    benefitTitle: {
        color: '#ffffff',
        fontSize: normalize(13),
        fontWeight: '800',
        letterSpacing: -0.2,
        lineHeight: normalize(16),
        marginBottom: normalizeHeight(1),
    },
    benefitDescription: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: normalize(12),
        fontWeight: '600',
        lineHeight: normalize(20),
        fontFamily: 'NunitoSans-Regular',
    },
    // Routine vs Exercise flow diagram
    flowDiagram: {
        gap: normalizeHeight(20),
    },
    flowStep: {},
    flowArrowOnly: {
        color: 'rgba(255,255,255,0.2)',
        fontSize: normalize(14),
        textAlign: 'center',
    },
    // Exercise card — same system as Routine card
    exerciseCard: {
        backgroundColor: '#252d47',
        borderRadius: normalize(12),
        borderWidth: 1,
        borderColor: '#3d4563',
        overflow: 'hidden',
    },
    exerciseAccentBar: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.30)',
    },
    exerciseCardContent: {
        padding: normalize(14),
        paddingBottom: normalize(11),
    },
    exerciseInnerDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
        marginHorizontal: normalize(14),
    },
    exerciseDescription: {
        padding: normalize(14),
        paddingTop: normalize(9),
        paddingBottom: normalize(11),
    },
    exerciseMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalizeWidth(6),
    },
    exerciseMetaDot: {
        width: normalize(5),
        height: normalize(5),
        borderRadius: normalize(4),
        backgroundColor: 'rgba(255,255,255,0.35)',
        marginRight: normalizeWidth(4),
    },
    exerciseMetaText: {
        flex: 1,
        color: 'rgba(255,255,255,0.55)',
        fontSize: normalize(12),
        fontFamily: 'RobotoMono-Regular',
    },
    exerciseTypePill: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: normalize(4),
        borderWidth: normalize(1),
        borderColor: 'rgba(255,255,255,0.22)',
        paddingHorizontal: normalizeWidth(7),
        paddingVertical: normalizeHeight(3),
        marginBottom: normalizeHeight(7),
    },
    exerciseTypeLabel: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: normalizeHeight(10),
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    exerciseCardName: {
        color: '#ffffff',
        fontSize: normalize(20),
        fontWeight: '800',
        letterSpacing: -0.4,
        lineHeight: normalize(24),
    },
    // Chips + routine container
    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: normalizeWidth(8),
        marginTop: normalizeHeight(10),
    },
    exerciseChip: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: normalize(20),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.10)',
        paddingHorizontal: normalizeWidth(10),
        paddingVertical: normalizeHeight(5),
    },
    exerciseChipText: {
        color: 'rgba(255,255,255,0.68)',
        fontSize: normalize(12),
        fontWeight: '500',
    },
    // Routine card — assembled result, elevated visually
    routineContainer: {
        backgroundColor: '#252d47',
        borderRadius: normalize(12),
        borderWidth: 1,
        borderColor: '#3d4563',
        overflow: 'hidden',
    },
    routineAccentBar: {
        height: 3,
        backgroundColor: '#4f7ee8',
    },
    routineContainerHeader: {
        padding: normalize(14),
        paddingBottom: normalize(11),
    },
    routineTypePill: {
        alignSelf: 'flex-start',
        backgroundColor: '#1f243b',
        borderRadius: normalize(4),
        borderWidth: normalize(1),
        borderColor: '#5a7bb3',
        paddingHorizontal: normalizeWidth(7),
        paddingVertical: normalizeHeight(3),
        marginBottom: normalizeHeight(7),
    },
    routineTypeLabel: {
        color: '#7fb3ff',
        fontSize: normalizeHeight(10),
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    routineContainerName: {
        color: '#ffffff',
        fontSize: normalize(22),
        fontWeight: '800',
        letterSpacing: -0.5,
        lineHeight: normalize(26),
    },
    routineTitleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: normalizeWidth(8),
        marginTop: normalizeHeight(4),
    },
    routineExerciseBadge: {
        borderWidth: normalize(1),
        borderColor: '#5a7bb3',
        borderRadius: normalize(4),
        backgroundColor: '#1f243b',
        paddingHorizontal: normalizeWidth(6),
        paddingVertical: normalizeHeight(3),
        marginLeft: normalizeWidth(8),
    },
    routineMetadata: {
        color: '#8f99c5',
        fontSize: normalize(12),
        fontFamily: 'RobotoMono-Regular',
        marginTop: normalizeHeight(4),
    },
    routineInnerDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.12)',
        marginHorizontal: normalize(14),
    },
    routineExerciseList: {
        padding: normalize(14),
        paddingTop: normalize(9),
    },
    routineExerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalizeWidth(10),
    },
    routineExerciseBullet: {
        width: normalize(5),
        height: normalize(5),
        borderRadius: normalize(4),
        backgroundColor: '#7fb3ff',
        marginRight: normalizeWidth(2),
    },
    routineExerciseName: {
        flex: 1,
        color: 'rgba(255,255,255,0.95)',
        fontSize: normalize(12),
        fontFamily: 'RobotoMono-Regular',
    },
    // kept for dead-style compat
    comparison: {
        flexDirection: 'row',
        marginTop: normalizeHeight(16),
        gap: normalizeWidth(20),
    },
    compCol: {
        flex: 1,
    },
    compTopBar: {
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        marginBottom: normalizeHeight(12),
    },
    compTopBarAccent: {
        backgroundColor: '#4f8ff4',
    },
    compColLabel: {
        color: '#fefefe',
        fontSize: normalize(14),
        fontWeight: '700',
        marginBottom: normalizeHeight(3),
    },
    compColDesc: {
        color: 'rgba(255,255,255,0.38)',
        fontSize: normalize(11),
        lineHeight: normalize(16),
        marginBottom: normalizeHeight(12),
    },
    compItem: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: normalize(13),
        lineHeight: normalize(22),
    },
    compRoutineName: {
        color: '#fefefe',
        fontSize: normalize(13),
        fontWeight: '600',
        marginBottom: normalizeHeight(2),
    },
    compRoutineItem: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: normalize(13),
        lineHeight: normalize(22),
        paddingLeft: normalizeWidth(6),
    },
});

export default RoutinesFaqScreen;
