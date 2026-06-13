import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize, normalizeHeight, normalizeWidth } from '../utils/normalize';
import white_left_arrow from '../images/white-left-arrow.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = SCREEN_WIDTH - normalizeWidth(40);
import faq_routine_details from '../images/faq-routine-details.png';
import faq_routines_list from '../images/faq-routines-list.png';

const Divider = () => <View style={styles.divider} />;

const INNER_IMAGE_WIDTH = IMAGE_WIDTH - normalizeWidth(16);

const ScreenshotImage = ({ source, aspectRatio, caption }: { source: any; aspectRatio: number; caption?: string }) => (
    <View style={styles.screenshotWrapper}>
        <View style={styles.screenshotImageClip}>
            <Image
                source={source}
                style={{ width: INNER_IMAGE_WIDTH, height: INNER_IMAGE_WIDTH / aspectRatio }}
                resizeMode="cover"
            />
        </View>
        {caption && <Text style={styles.screenshotCaption}>{caption}</Text>}
    </View>
);

const BenefitItem = ({ title, description }: { title: string; description: string }) => (
    <View style={styles.benefitItem}>
        <View style={styles.benefitTitleRow}>
            <View style={styles.benefitAccent} />
            <Text style={styles.benefitTitle}>{title}</Text>
        </View>
        <Text style={styles.benefitDescription}>{description}</Text>
    </View>
);


const SectionTitle = ({ children }: { children: string }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
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
                <Text style={styles.pageTitle}>What are Routines?</Text>
                <Text style={styles.body}>
                    {'A routine is a '}
                    <Text style={styles.bodyEmphasis}>collection of exercises</Text>
                    {' that you perform together during a workout.'}
                </Text>
                <Text style={[styles.bodySecondary, { marginTop: normalizeHeight(10) }]}>
                    {'Think of a routine as a '}
                    <Text style={styles.bodyEmphasis}>workout template</Text>
                    {' that you can '}
                    <Text style={styles.bodyEmphasis}>save and reuse</Text>
                    {' whenever you train.'}
                </Text>

                <ScreenshotImage
                    source={faq_routine_details}
                    aspectRatio={707 / 806}
                    caption="Example Routine — Push Day: Bench Press, Shoulder Press, Tricep Pushdowns"
                />

                <Divider />

                {/* Why Use Routines */}
                <SectionTitle>Why Use Routines?</SectionTitle>
                <BenefitItem
                    title="Start Workouts Faster"
                    description="Your exercise list is ready to go. No searching, no setup."
                />
                <BenefitItem
                    title="Build a Consistent Habit"
                    description="Same structure each session makes effort easier to measure."
                />
                <BenefitItem
                    title="Reuse What Works"
                    description="Save once. Use it until your goals change."
                />
                <BenefitItem
                    title="Compare Progress Accurately"
                    description="Like-for-like sessions make progress comparisons meaningful."
                />

                <Divider />

                {/* Routine vs Exercise */}
                <SectionTitle>Routine vs Exercise</SectionTitle>

                <View style={styles.comparison}>
                    <View style={styles.compCol}>
                        <View style={styles.compTopBar} />
                        <Text style={styles.compColLabel}>Exercise</Text>
                        <Text style={styles.compColDesc}>A single movement</Text>
                        <Text style={styles.compItem}>Push-Up</Text>
                        <Text style={styles.compItem}>Squat</Text>
                        <Text style={styles.compItem}>Pull-Up</Text>
                        <Text style={styles.compItem}>Deadlift</Text>
                    </View>
                    <View style={styles.compCol}>
                        <View style={[styles.compTopBar, styles.compTopBarAccent]} />
                        <Text style={styles.compColLabel}>Routine</Text>
                        <Text style={styles.compColDesc}>A collection of exercises</Text>
                        <Text style={styles.compRoutineName}>Push Day</Text>
                        <Text style={styles.compRoutineItem}>Bench Press</Text>
                        <Text style={styles.compRoutineItem}>Shoulder Press</Text>
                        <Text style={styles.compRoutineItem}>Tricep Pushdown</Text>
                    </View>
                </View>

                <Divider />

                {/* Do I Need a Routine */}
                <SectionTitle>Do I Need a Routine?</SectionTitle>
                <Text style={styles.body}>No.</Text>
                <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                    You can track workouts by selecting exercises individually. Routines simply make it faster when you regularly perform the same group of exercises.
                </Text>

                <Divider />

                {/* Managing Routines */}
                <SectionTitle>Managing Your Routines</SectionTitle>
                <Text style={styles.body}>
                    FitForge lets you create, edit, and customise routines at any time. Build routines that match your training style, schedule, and goals.
                </Text>
                <Text style={[styles.body, { marginTop: normalizeHeight(8) }]}>
                    You can access and manage your routines from the Routines section.
                </Text>

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
        fontSize: normalize(22),
        fontWeight: '700',
        fontFamily: 'serif',
        letterSpacing: 0,
        marginBottom: normalizeHeight(10),
    },
    body: {
        color: 'rgba(255,255,255,0.72)',
        fontSize: normalize(15),
        lineHeight: normalize(25),
    },
    bodySecondary: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: normalize(14),
        lineHeight: normalize(23),
    },
    bodyEmphasis: {
        color: 'rgba(255,255,255,0.92)',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginVertical: normalizeHeight(30),
    },
    sectionTitle: {
        color: '#fefefe',
        fontSize: normalize(17),
        fontWeight: '700',
        letterSpacing: 0.6,
        marginBottom: normalizeHeight(14),
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
        borderRadius: normalize(12),
        borderWidth: 1,
        borderColor: '#3d4563',
        padding: normalize(8),
    },
    screenshotImageClip: {
        borderRadius: normalize(6),
        overflow: 'hidden',
    },
    screenshotCaption: {
        color: 'rgba(255,255,255,0.62)',
        fontSize: normalize(12),
        fontWeight: '500',
        lineHeight: normalize(17),
        paddingTop: normalizeHeight(8),
        paddingBottom: normalizeHeight(2),
        paddingHorizontal: normalize(4),
    },
    // Benefit items
    benefitItem: {
        marginBottom: normalizeHeight(18),
    },
    benefitTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalizeHeight(4),
    },
    benefitAccent: {
        width: 2,
        height: normalize(14),
        backgroundColor: 'rgba(79, 143, 244, 0.55)',
        borderRadius: 1,
        marginRight: normalizeWidth(8),
    },
    benefitTitle: {
        color: 'rgba(255,255,255,0.88)',
        fontSize: normalize(14),
        fontWeight: '600',
    },
    benefitDescription: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: normalize(13),
        lineHeight: normalize(20),
        paddingLeft: normalizeWidth(10),
    },
    // Routine vs Exercise comparison
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
