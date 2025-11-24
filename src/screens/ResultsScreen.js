import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import {useLanguage} from '../context/LanguageContext';
import {useStats} from '../context/StatsContext';
import {colors, radius, spacing} from '../theme';

const ResultsScreen = ({route, navigation}) => {
    const {t} = useLanguage();
    const {registerGame} = useStats();
    const summary = route?.params?.summary;

    useEffect(() => {
        if (!summary) return;
        registerGame({
            score: summary.score || 0,
            totalDistanceKm: summary.totalDistanceKm || 0,
            guessesCount: summary.guessesCount || 0,
        });
    }, []);

    if (!summary) {
        return (
            <NeonScreen>
                <View style={styles.center}>
                    <Text style={styles.title}>{t('results_title')}</Text>
                    <Text style={styles.muted}>{t('results_no_data')}</Text>
                    <NeonButton
                        label={t('back_to_menu')}
                        variant="secondary"
                        onPress={() => navigation.replace('Menu')}
                        style={styles.button}
                    />
                </View>
            </NeonScreen>
        );
    }

    const modeLabel =
        summary.mode === 'arcade' ? t('results_mode_arcade') : t('results_mode_quick');

    const difficultyLabel =
        summary.difficulty === 'easy'
            ? t('difficulty_easy')
            : summary.difficulty === 'hard'
                ? t('difficulty_hard')
                : t('difficulty_normal');

    return (
        <NeonScreen>
            <View style={styles.container}>
                <Text style={styles.title}>{t('results_title')}</Text>
                <View style={styles.card}>
                    <Text style={styles.modeLabel}>
                        {modeLabel} · {difficultyLabel}
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('results_total_score')}</Text>
                        <Text style={styles.value}>{summary.score}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('results_rounds_played')}</Text>
                        <Text style={styles.value}>{summary.roundsPlayed}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('results_avg_distance')}</Text>
                        <Text style={styles.value}>
                            {summary.averageDistanceKm != null
                                ? `${summary.averageDistanceKm} km`
                                : '—'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('results_best_round')}</Text>
                        <Text style={styles.value}>
                            {summary.bestDistanceKm != null
                                ? `${summary.bestDistanceKm} km`
                                : '—'}
                        </Text>
                    </View>
                </View>

                <NeonButton
                    label={t('results_play_again')}
                    onPress={() => navigation.replace('Game', {mode: summary.mode || 'quick'})}
                    style={styles.button}
                />
                <NeonButton
                    label={t('back_to_menu')}
                    variant="secondary"
                    onPress={() => navigation.replace('Menu')}
                    style={styles.button}
                />
                <NeonButton
                    label={t('stats_title')}
                    variant="ghost"
                    onPress={() => navigation.navigate('Stats')}
                    style={styles.buttonGhost}
                />
            </View>
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: spacing.lg,
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: spacing.lg,
    },
    muted: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: spacing.md,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        marginBottom: spacing.lg,
    },
    modeLabel: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: spacing.sm,
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
    button: {
        marginBottom: spacing.sm,
    },
    buttonGhost: {
        marginTop: spacing.xs,
    },
});

export default ResultsScreen;
