import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import {useLanguage} from '../context/LanguageContext';
import {colors, radius, spacing} from '../theme';

const HowToPlayScreen = ({navigation}) => {
    const {t} = useLanguage();

    return (
        <NeonScreen>
            <View style={styles.headerRow}>
                <NeonButton
                    label="←"
                    variant="secondary"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>{t('how_title')}</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <View style={styles.stepCard}>
                    <Text style={styles.stepNumber}>01</Text>
                    <Text style={styles.stepText}>{t('how_step_1')}</Text>
                </View>
                <View style={styles.stepCard}>
                    <Text style={styles.stepNumber}>02</Text>
                    <Text style={styles.stepText}>{t('how_step_2')}</Text>
                </View>
                <View style={styles.stepCard}>
                    <Text style={styles.stepNumber}>03</Text>
                    <Text style={styles.stepText}>{t('how_step_3')}</Text>
                </View>
                <View style={styles.stepCard}>
                    <Text style={styles.stepNumber}>04</Text>
                    <Text style={styles.stepText}>{t('how_step_4')}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomRow}>
                <NeonButton
                    label={t('menu_quick_play')}
                    onPress={() => navigation.replace('Game', {mode: 'quick'})}
                    style={styles.bottomButton}
                />
                <NeonButton
                    label={t('back_to_menu')}
                    variant="secondary"
                    onPress={() => navigation.navigate('Menu')}
                    style={styles.bottomButton}
                />
            </View>
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
        fontSize: 24,
        fontWeight: '700',
    },
    content: {
        paddingBottom: spacing.lg,
    },
    stepCard: {
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
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
    bottomRow: {
        marginTop: spacing.md,
    },
    bottomButton: {
        width: '100%',
        marginBottom: spacing.sm,
    },
});

export default HowToPlayScreen;
