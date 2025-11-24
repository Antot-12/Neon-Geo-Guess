import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {useLanguage} from '../context/LanguageContext';
import {colors, radius, spacing} from '../theme';

const {width} = Dimensions.get('window');

const MenuScreen = ({navigation}) => {
    const {t} = useLanguage();

    return (
        <NeonScreen>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.overline}>streetview guessing</Text>
                        <Text style={styles.title}>{t('app_title')}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>v1.0</Text>
                    </View>
                </View>

                <View style={styles.heroCard}>
                    <View style={styles.heroLeft}>
                        <Text style={styles.heroTitle}>Guess the place</Text>
                        <Text style={styles.heroSubtitle}>
                            Rotate the 360° view, place a pin on the map and see how close you are.
                        </Text>
                        <NeonButton
                            label={t('menu_quick_play')}
                            onPress={() => navigation.navigate('Game', {mode: 'quick'})}
                            style={styles.primaryCta}
                        />
                        <NeonButton
                            label={t('menu_arcade')}
                            onPress={() => navigation.navigate('Game', {mode: 'arcade'})}
                            variant="secondary"
                        />
                    </View>
                    <View style={styles.heroRight}>
                        <View style={styles.pill}>
                            <Text style={styles.pillLabel}>360°</Text>
                        </View>
                        <View style={styles.heroCircleOuter}>
                            <View style={styles.heroCircleInner}>
                                <Text style={styles.heroCircleText}>🌍</Text>
                            </View>
                        </View>
                        <Text style={styles.heroHint}>No walking, just one perfect guess.</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{t('menu_how_to_play')}</Text>
                        <Text style={styles.cardText}>
                            Short tutorial on rules, scoring and tips for better guesses.
                        </Text>
                        <NeonButton
                            label={t('menu_how_to_play')}
                            onPress={() => navigation.navigate('HowToPlay')}
                            variant="secondary"
                            style={styles.cardButton}
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{t('menu_settings')}</Text>
                        <Text style={styles.cardText}>
                            Change language, difficulty and feedback options.
                        </Text>
                        <NeonButton
                            label={t('menu_settings')}
                            onPress={() => navigation.navigate('Settings')}
                            variant="secondary"
                            style={styles.cardButton}
                        />
                    </View>
                </View>

                <LanguageSwitcher />

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>© 2025 Neon GeoGuess</Text>
                    <Text style={styles.footerText}>Made for mobile screens</Text>
                </View>
            </ScrollView>
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xl,
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    overline: {
        color: colors.muted,
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    title: {
        color: colors.text,
        fontSize: 30,
        fontWeight: '800',
        marginTop: spacing.xs,
    },
    tag: {
        marginLeft: 'auto',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        backgroundColor: 'rgba(15,23,42,0.9)',
    },
    tagText: {
        color: colors.muted,
        fontSize: 12,
    },
    heroCard: {
        flexDirection: width < 380 ? 'column' : 'row',
        backgroundColor: colors.card,
        borderRadius: radius.xl,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    heroLeft: {
        flex: 1.4,
        marginRight: width < 380 ? 0 : spacing.lg,
        marginBottom: width < 380 ? spacing.md : 0,
    },
    heroRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroTitle: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },
    heroSubtitle: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: spacing.md,
    },
    primaryCta: {
        marginBottom: spacing.sm,
    },
    heroCircleOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: colors.accentSoft,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15,23,42,0.9)',
    },
    heroCircleInner: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(34,211,238,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroCircleText: {
        fontSize: 40,
    },
    heroHint: {
        marginTop: spacing.sm,
        color: colors.muted,
        fontSize: 13,
    },
    pill: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 999,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        backgroundColor: 'rgba(34,211,238,0.14)',
    },
    pillLabel: {
        color: colors.accent,
        fontSize: 12,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    card: {
        width: width > 420 ? '48%' : '100%',
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    cardText: {
        color: colors.muted,
        fontSize: 13,
        marginBottom: spacing.sm,
    },
    cardButton: {
        alignSelf: 'stretch',
    },
    footerRow: {
        marginTop: spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        color: colors.muted,
        fontSize: 11,
    },
});

export default MenuScreen;
