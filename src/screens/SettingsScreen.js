import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {useLanguage} from '../context/LanguageContext';
import {useSettings} from '../context/SettingsContext';
import {colors, radius, spacing} from '../theme';

const SettingsScreen = ({navigation}) => {
    const {t} = useLanguage();
    const {
        difficulty,
        soundEnabled,
        vibrationEnabled,
        setDifficulty,
        setSoundEnabled,
        setVibrationEnabled,
    } = useSettings();

    return (
        <NeonScreen>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <NeonButton
                        label="←"
                        variant="secondary"
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    />
                    <View>
                        <Text style={styles.title}>{t('settings_title')}</Text>
                        <Text style={styles.subtitle}>Tuning the experience</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('settings_language')}</Text>
                    <LanguageSwitcher />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('settings_difficulty')}</Text>
                    <Text style={styles.cardDescription}>
                        Higher difficulty gives more points but punishes large misses.
                    </Text>
                    <View style={styles.rowButtons}>
                        <NeonButton
                            label={t('difficulty_easy')}
                            variant={difficulty === 'easy' ? 'primary' : 'secondary'}
                            onPress={() => setDifficulty('easy')}
                            style={styles.rowButton}
                        />
                        <NeonButton
                            label={t('difficulty_normal')}
                            variant={difficulty === 'normal' ? 'primary' : 'secondary'}
                            onPress={() => setDifficulty('normal')}
                            style={styles.rowButton}
                        />
                        <NeonButton
                            label={t('difficulty_hard')}
                            variant={difficulty === 'hard' ? 'primary' : 'secondary'}
                            onPress={() => setDifficulty('hard')}
                            style={styles.rowButton}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Feedback</Text>
                    <Text style={styles.cardDescription}>
                        Control haptics and sounds for distance result and streaks.
                    </Text>
                    <View style={styles.switchRow}>
                        <View>
                            <Text style={styles.switchLabel}>{t('settings_sound')}</Text>
                            <Text style={styles.switchHint}>
                                Short effects on guess result
                            </Text>
                        </View>
                        <Switch
                            value={soundEnabled}
                            onValueChange={setSoundEnabled}
                            trackColor={{false: colors.card, true: colors.accentSecondary}}
                            thumbColor={colors.text}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <View>
                            <Text style={styles.switchLabel}>{t('settings_vibration')}</Text>
                            <Text style={styles.switchHint}>
                                Device vibration on big misses
                            </Text>
                        </View>
                        <Switch
                            value={vibrationEnabled}
                            onValueChange={setVibrationEnabled}
                            trackColor={{false: colors.card, true: colors.accentSecondary}}
                            thumbColor={colors.text}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('stats_title')}</Text>
                    <NeonButton
                        label={t('stats_open')}
                        variant="secondary"
                        onPress={() => navigation.navigate('Stats')}
                    />
                    <NeonButton
                        label={t('about_title')}
                        variant="ghost"
                        onPress={() => navigation.navigate('About')}
                    />
                </View>

                <View style={styles.bottomRow}>
                    <NeonButton
                        label={t('back_to_menu')}
                        variant="secondary"
                        onPress={() => navigation.navigate('Menu')}
                        style={styles.fullWidthButton}
                    />
                </View>
            </ScrollView>
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xl,
    },
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
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    cardDescription: {
        color: colors.muted,
        fontSize: 13,
        marginBottom: spacing.sm,
    },
    rowButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    rowButton: {
        flex: 1,
        marginHorizontal: spacing.xs,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    switchLabel: {
        color: colors.text,
        fontSize: 15,
    },
    switchHint: {
        color: colors.muted,
        fontSize: 12,
    },
    bottomRow: {
        marginTop: spacing.lg,
    },
    fullWidthButton: {
        width: '100%',
    },
});

export default SettingsScreen;
