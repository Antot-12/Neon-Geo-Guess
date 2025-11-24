import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import {useLanguage} from '../context/LanguageContext';
import {useStats} from '../context/StatsContext';
import {colors, radius, spacing} from '../theme';

const StatsScreen = ({navigation}) => {
    const {t} = useLanguage();
    const {ready, gamesPlayed, bestScore, totalDistanceKm, totalGuesses} = useStats();

    const avgDistance =
        totalGuesses > 0 ? Math.round(totalDistanceKm / totalGuesses) : null;

    return (
        <NeonScreen>
            <View style={styles.headerRow}>
                <NeonButton
                    label="←"
                    variant="secondary"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>{t('stats_title')}</Text>
            </View>
            <View style={styles.card}>
                {!ready && (
                    <Text style={styles.muted}>{t('loading')}</Text>
                )}
                {ready && gamesPlayed === 0 && (
                    <Text style={styles.muted}>{t('stats_no_data')}</Text>
                )}
                {ready && gamesPlayed > 0 && (
                    <>
                        <View style={styles.row}>
                            <Text style={styles.label}>{t('stats_games_played')}</Text>
                            <Text style={styles.value}>{gamesPlayed}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{t('stats_best_score')}</Text>
                            <Text style={styles.value}>{bestScore}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{t('stats_total_distance')}</Text>
                            <Text style={styles.value}>
                                {Math.round(totalDistanceKm)} km
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{t('stats_avg_distance')}</Text>
                            <Text style={styles.value}>
                                {avgDistance != null ? `${avgDistance} km` : '—'}
                            </Text>
                        </View>
                    </>
                )}
            </View>
            <NeonButton
                label={t('back_to_menu')}
                variant="secondary"
                onPress={() => navigation.navigate('Menu')}
            />
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    backButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.md,
    },
    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.xs,
    },
    label: {
        color: colors.muted,
        fontSize: 14,
    },
    value: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    muted: {
        color: colors.muted,
        fontSize: 14,
    },
});

export default StatsScreen;
