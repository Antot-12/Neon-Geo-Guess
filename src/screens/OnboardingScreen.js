import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import {useLanguage} from '../context/LanguageContext';
import {colors, radius, spacing} from '../theme';

const OnboardingScreen = ({onFinish}) => {
    const {t} = useLanguage();

    return (
        <NeonScreen>
            <View style={styles.container}>
                <Text style={styles.overline}>{t('onboarding_overline')}</Text>
                <Text style={styles.title}>{t('onboarding_title')}</Text>
                <View style={styles.card}>
                    <Text style={styles.stepNumber}>01</Text>
                    <Text style={styles.stepText}>{t('onboarding_step_1')}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.stepNumber}>02</Text>
                    <Text style={styles.stepText}>{t('onboarding_step_2')}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.stepNumber}>03</Text>
                    <Text style={styles.stepText}>{t('onboarding_step_3')}</Text>
                </View>
                <NeonButton
                    label={t('onboarding_start')}
                    onPress={onFinish}
                    style={styles.button}
                />
            </View>
        </NeonScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.lg,
    },
    overline: {
        color: colors.muted,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: spacing.xs,
    },
    title: {
        color: colors.text,
        fontSize: 26,
        fontWeight: '800',
        marginBottom: spacing.lg,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    stepNumber: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    stepText: {
        color: colors.text,
        fontSize: 15,
    },
    button: {
        marginTop: spacing.lg,
    },
});

export default OnboardingScreen;
