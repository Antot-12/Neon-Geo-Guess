import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Alert,
} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import PanoramaView from '../components/PanoramaView';
import GuessMap from '../components/GuessMap';
import {useLanguage} from '../context/LanguageContext';
import {useSettings} from '../context/SettingsContext';
import {useGameEngine} from '../hooks/useGameEngine';
import {colors, radius, spacing} from '../theme';
import {ARCADE_ROUND_SECONDS} from '../config/scoring';

const GameScreen = ({route, navigation}) => {
    const {t, lang} = useLanguage();
    const {difficulty} = useSettings();
    const mode = route?.params?.mode || 'quick';

    const {
        round,
        maxRounds,
        score,
        lives,
        streak,
        currentLocation,
        guessCoord,
        distanceKm,
        hasGuessed,
        lastPoints,
        lastVerdict,
        wasTimeout,
        timeLeft,
        lockGuess,
        skipRound,
        nextRound,
        handleGuessCoord,
    } = useGameEngine(mode, difficulty);

    const {width, height} = useWindowDimensions();
    const isLandscape = width > height;

    const [viewMode, setViewMode] = useState('view');
    const [overlayVisible, setOverlayVisible] = useState(false);
    const overlayScale = useRef(new Animated.Value(0.9)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const prevHasGuessed = useRef(hasGuessed);

    useEffect(() => {
        if (!prevHasGuessed.current && hasGuessed) {
            setOverlayVisible(true);
            overlayScale.setValue(0.9);
            overlayOpacity.setValue(0);
            Animated.parallel([
                Animated.timing(overlayScale, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    duration: 220,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        if (prevHasGuessed.current && !hasGuessed) {
            overlayScale.setValue(0.9);
            overlayOpacity.setValue(0);
            setOverlayVisible(false);
        }
        prevHasGuessed.current = hasGuessed;
    }, [hasGuessed, overlayOpacity, overlayScale]);

    useEffect(() => {
        setViewMode('view');
    }, [mode]);

    const verdictLabel = () => {
        if (wasTimeout) {
            return t('result_verdict_timeout');
        }
        if (lastVerdict === 'perfect') return t('result_verdict_perfect');
        if (lastVerdict === 'very_close') return t('result_verdict_very_close');
        if (lastVerdict === 'close') return t('result_verdict_close');
        if (lastVerdict === 'far') return t('result_verdict_far');
        if (lastVerdict === 'very_far') return t('result_verdict_very_far');
        return '';
    };

    const difficultyLabel = () => {
        if (difficulty === 'easy') return t('difficulty_easy');
        if (difficulty === 'hard') return t('difficulty_hard');
        return t('difficulty_normal');
    };

    const modeLabel = () => {
        if (mode === 'arcade') {
            return t('results_mode_arcade');
        }
        return t('results_mode_quick');
    };

    const handleLockPress = () => {
        const ok = lockGuess();
        if (!ok && !guessCoord) {
            Alert.alert(
                lang === 'uk'
                    ? 'Клікни на мапі, щоб обрати місце.'
                    : 'Tap on the map to choose a location first.',
            );
            setViewMode('map');
        }
    };

    const handleNextPress = () => {
        setOverlayVisible(false);
        const result = nextRound();
        if (result && result.finished && result.summary) {
            navigation.replace('Results', {summary: result.summary});
            return;
        }
    };

    const handleSkipPress = () => {
        setOverlayVisible(false);
        const result = skipRound();
        if (result && result.finished && result.summary) {
            navigation.replace('Results', {summary: result.summary});
        }
    };

    const handleOverlayNext = () => {
        handleNextPress();
    };

    const timerProgress = () => {
        if (!timeLeft || ARCADE_ROUND_SECONDS === 0) return 0;
        return timeLeft / ARCADE_ROUND_SECONDS;
    };

    const placeLabel = () => {
        if (!currentLocation) return '';
        return lang === 'uk' ? currentLocation.name_uk : currentLocation.name_en;
    };

    const regionLabel = () => {
        if (!currentLocation) return '';
        return lang === 'uk' ? currentLocation.region_uk : currentLocation.region_en;
    };

    const clueText = () => {
        if (!currentLocation) return '';
        return lang === 'uk' ? currentLocation.clue_uk : currentLocation.clue_en;
    };

    if (isLandscape && currentLocation) {
        return (
            <NeonScreen>
                <View style={styles.landscapeContainer}>
                    <View style={styles.landscapePano}>
                        <PanoramaView imageUrl={currentLocation.panoUrl} />
                    </View>
                    <View style={styles.landscapeHintContainer}>
                        <Text style={styles.landscapeHint}>
                            {lang === 'uk'
                                ? 'Переверни телефон у портретний режим, щоб продовжити гру.'
                                : 'Rotate back to portrait to continue playing.'}
                        </Text>
                    </View>
                </View>
            </NeonScreen>
        );
    }

    return (
        <NeonScreen>
            <View style={styles.screen}>
                <View style={styles.headerRow}>
                    <NeonButton
                        label="←"
                        variant="secondary"
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    />
                    <View style={styles.headerTextBlock}>
                        <Text style={styles.headerTitle}>{t('app_title')}</Text>
                        <Text style={styles.headerSubtitle}>
                            {modeLabel()} · {difficultyLabel()}
                        </Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statChip}>
                        <Text style={styles.statLabel}>{t('game_round')}</Text>
                        <Text style={styles.statValue}>
                            {round}
                            {mode === 'quick' && Number.isFinite(maxRounds) ? `/${maxRounds}` : ''}
                        </Text>
                    </View>
                    <View style={styles.statChip}>
                        <Text style={styles.statLabel}>{t('game_score')}</Text>
                        <Text style={styles.statValue}>{score}</Text>
                    </View>
                    <View style={styles.statChip}>
                        <Text style={styles.statLabel}>{t('game_lives')}</Text>
                        <Text style={styles.statValue}>{lives}</Text>
                    </View>
                    <View style={styles.statChip}>
                        <Text style={styles.statLabel}>{t('game_streak')}</Text>
                        <Text style={styles.statValue}>{streak}</Text>
                    </View>
                </View>

                <View style={styles.clueCard}>
                    <View style={styles.clueHeaderRow}>
                        <Text style={styles.regionPill}>{regionLabel()}</Text>
                        {hasGuessed && (
                            <Text style={styles.placeName}>{placeLabel()}</Text>
                        )}
                    </View>
                    <Text style={styles.clueText}>{clueText()}</Text>
                </View>

                <View style={styles.toggleRow}>
                    <Pressable
                        onPress={() => setViewMode('view')}
                        style={[
                            styles.toggleButton,
                            viewMode === 'view' && styles.toggleButtonActive,
                        ]}>
                        <Text
                            style={[
                                styles.toggleText,
                                viewMode === 'view' && styles.toggleTextActive,
                            ]}>
                            {t('view_street')}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setViewMode('map')}
                        style={[
                            styles.toggleButton,
                            viewMode === 'map' && styles.toggleButtonActive,
                        ]}>
                        <Text
                            style={[
                                styles.toggleText,
                                viewMode === 'map' && styles.toggleTextActive,
                            ]}>
                            {t('view_map')}
                        </Text>
                    </Pressable>
                </View>

                {mode === 'arcade' && (
                    <View style={styles.timerRow}>
                        <View style={styles.timerBarBackground}>
                            <View
                                style={[
                                    styles.timerBarFill,
                                    {width: `${timerProgress() * 100}%`},
                                ]}
                            />
                        </View>
                        <Text style={styles.timerLabel}>
                            {t('game_time_label')}: {timeLeft || 0}s
                        </Text>
                    </View>
                )}

                <View style={styles.viewerArea}>
                    {viewMode === 'view' && currentLocation && (
                        <View style={styles.panoCard}>
                            <View style={styles.panoContainer}>
                                <PanoramaView imageUrl={currentLocation.panoUrl} />
                            </View>
                            <View style={styles.panoFooterRow}>
                                <Text style={styles.panoHint}>
                                    {lang === 'uk'
                                        ? 'Крути панораму, щоб зрозуміти, де ти.'
                                        : 'Rotate the 360° view to understand where you are.'}
                                </Text>
                                <View style={styles.miniMapWrapper}>
                                    <GuessMap
                                        compact
                                        guessCoord={guessCoord}
                                        answerCoord={
                                            currentLocation
                                                ? {lat: currentLocation.lat, lon: currentLocation.lon}
                                                : null
                                        }
                                        showAnswer={hasGuessed}
                                    />
                                    <Pressable
                                        style={styles.miniMapOverlay}
                                        onPress={() => setViewMode('map')}>
                                        <Text style={styles.miniMapLabel}>{t('view_map')}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                    {viewMode === 'map' && (
                        <View style={styles.mapCard}>
                            <View style={styles.mapContainer}>
                                <GuessMap
                                    onGuess={handleGuessCoord}
                                    guessCoord={guessCoord}
                                    answerCoord={
                                        currentLocation
                                            ? {lat: currentLocation.lat, lon: currentLocation.lon}
                                            : null
                                    }
                                    showAnswer={hasGuessed}
                                />
                            </View>
                            <Text style={styles.mapHint}>
                                {!guessCoord
                                    ? lang === 'uk'
                                        ? 'Клікни на мапі, щоб поставити пін.'
                                        : 'Tap on the map to place your pin.'
                                    : lang === 'uk'
                                        ? 'Пін встановлено, натисни "Підтвердити вибір".'
                                        : 'Pin placed, press "Lock guess".'}
                            </Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>
                                    {t('game_distance_label')}:{' '}
                                    {distanceKm != null ? `${distanceKm} km` : '—'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.bottomLeft}>
                        <NeonButton
                            label={t('game_skip')}
                            variant="secondary"
                            onPress={handleSkipPress}
                            style={styles.smallButton}
                        />
                    </View>
                    <View style={styles.bottomMiddle}>
                        <NeonButton
                            label={t('game_guess_button')}
                            variant="primary"
                            onPress={handleLockPress}
                            style={styles.mainButton}
                            disabled={!guessCoord || hasGuessed}
                        />
                    </View>
                    <View style={styles.bottomRight}>
                        <NeonButton
                            label={t('game_next_button')}
                            variant="secondary"
                            onPress={handleNextPress}
                            style={styles.mainButton}
                            disabled={!hasGuessed}
                        />
                    </View>
                </View>

                {overlayVisible && (
                    <View style={styles.overlayBackdrop}>
                        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOverlayVisible(false)} />
                        <Animated.View
                            style={[
                                styles.overlayCard,
                                {
                                    opacity: overlayOpacity,
                                    transform: [{scale: overlayScale}],
                                },
                            ]}>
                            <Text style={styles.overlayTitle}>{t('result_title')}</Text>
                            <Text style={styles.overlayDistance}>
                                {distanceKm != null ? `${distanceKm} km` : '—'}
                            </Text>
                            <Text style={styles.overlayVerdict}>{verdictLabel()}</Text>
                            <View style={styles.overlayRow}>
                                <Text style={styles.overlayLabel}>{t('result_points')}</Text>
                                <Text style={styles.overlayValue}>
                                    {(lastPoints >= 0 ? '+' : '') + lastPoints}
                                </Text>
                            </View>
                            <View style={styles.overlayRow}>
                                <Text style={styles.overlayLabel}>{t('game_streak')}</Text>
                                <Text style={styles.overlayValue}>{streak}</Text>
                            </View>
                            <View style={styles.overlayRow}>
                                <Text style={styles.overlayLabel}>{t('settings_difficulty')}</Text>
                                <Text style={styles.overlayValue}>{difficultyLabel()}</Text>
                            </View>
                            <View style={styles.overlayButtonsRow}>
                                <NeonButton
                                    label={t('game_next_button')}
                                    onPress={handleOverlayNext}
                                    style={styles.overlayButtonPrimary}
                                />
                                <NeonButton
                                    label={t('game_skip')}
                                    variant="secondary"
                                    onPress={() => {
                                        setOverlayVisible(false);
                                        handleSkipPress();
                                    }}
                                    style={styles.overlayButtonSecondary}
                                />
                            </View>
                        </Animated.View>
                    </View>
                )}
            </View>
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    backButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.md,
    },
    headerTextBlock: {
        flex: 1,
    },
    headerTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 2,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    statChip: {
        flex: 1,
        backgroundColor: 'rgba(15,23,42,0.85)',
        borderRadius: radius.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        marginHorizontal: 3,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    statLabel: {
        color: colors.muted,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statValue: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginTop: 2,
    },
    clueCard: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        marginBottom: spacing.sm,
    },
    clueHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    regionPill: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 999,
        backgroundColor: 'rgba(34,211,238,0.12)',
        color: colors.accent,
        fontSize: 12,
    },
    placeName: {
        marginLeft: spacing.sm,
        color: colors.text,
        fontSize: 13,
    },
    clueText: {
        marginTop: spacing.xs,
        color: colors.muted,
        fontSize: 14,
    },
    toggleRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderRadius: 999,
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        marginTop: spacing.sm,
        marginBottom: spacing.sm,
    },
    toggleButton: {
        flex: 1,
        borderRadius: 999,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButtonActive: {
        backgroundColor: 'rgba(34,211,238,0.14)',
    },
    toggleText: {
        color: colors.muted,
        fontSize: 13,
        fontWeight: '600',
    },
    toggleTextActive: {
        color: colors.text,
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    timerBarBackground: {
        flex: 1,
        height: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(15,23,42,0.9)',
        overflow: 'hidden',
        marginRight: spacing.sm,
    },
    timerBarFill: {
        height: '100%',
        backgroundColor: colors.accent,
    },
    timerLabel: {
        color: colors.muted,
        fontSize: 12,
    },
    viewerArea: {
        flex: 1,
        marginBottom: spacing.sm,
    },
    panoCard: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    panoContainer: {
        flex: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.bg,
    },
    panoFooterRow: {
        marginTop: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
    },
    panoHint: {
        flex: 1,
        color: colors.muted,
        fontSize: 13,
    },
    miniMapWrapper: {
        width: 96,
        height: 96,
        marginLeft: spacing.sm,
        borderRadius: 48,
        overflow: 'hidden',
    },
    miniMapOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    miniMapLabel: {
        color: colors.text,
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'rgba(5,8,22,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
    },
    mapCard: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    mapContainer: {
        flex: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.bg,
    },
    mapHint: {
        marginTop: spacing.sm,
        color: colors.muted,
        fontSize: 13,
    },
    infoRow: {
        marginTop: spacing.xs,
    },
    infoText: {
        color: colors.muted,
        fontSize: 13,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    bottomLeft: {
        flex: 0.9,
        marginRight: spacing.xs,
    },
    bottomMiddle: {
        flex: 1.1,
        marginHorizontal: spacing.xs,
    },
    bottomRight: {
        flex: 0.9,
        marginLeft: spacing.xs,
    },
    smallButton: {
        paddingVertical: spacing.sm,
    },
    mainButton: {
        paddingVertical: spacing.sm,
    },
    overlayBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(5,8,22,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayCard: {
        width: '80%',
        backgroundColor: colors.card,
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    overlayTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    overlayDistance: {
        color: colors.text,
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    overlayVerdict: {
        color: colors.accent,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    overlayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
    },
    overlayLabel: {
        color: colors.muted,
        fontSize: 13,
    },
    overlayValue: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    overlayButtonsRow: {
        marginTop: spacing.md,
    },
    overlayButtonPrimary: {
        width: '100%',
        marginBottom: spacing.xs,
    },
    overlayButtonSecondary: {
        width: '100%',
    },
    landscapeContainer: {
        flex: 1,
    },
    landscapePano: {
        flex: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    landscapeHintContainer: {
        position: 'absolute',
        left: spacing.md,
        right: spacing.md,
        bottom: spacing.lg,
        alignItems: 'center',
    },
    landscapeHint: {
        color: colors.text,
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: 'rgba(5,8,22,0.7)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 999,
    },
});

export default GameScreen;
