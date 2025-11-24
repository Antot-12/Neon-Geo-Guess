import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NeonScreen from '../components/NeonScreen';
import NeonButton from '../components/NeonButton';
import {useLanguage} from '../context/LanguageContext';
import {colors, radius, spacing} from '../theme';

const AboutScreen = ({navigation}) => {
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
                <Text style={styles.title}>{t('about_title')}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>{t('about_tech_stack')}</Text>
                <Text style={styles.text}>
                    React Native · Expo · React Navigation · AsyncStorage · WebView · Leaflet · Pannellum
                </Text>
                <Text style={styles.sectionTitle}>{t('about_built_with')}</Text>
                <Text style={styles.text}>
                    {t('about_description')}
                </Text>
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
    sectionTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.xs,
        marginTop: spacing.sm,
    },
    text: {
        color: colors.muted,
        fontSize: 14,
    },
});

export default AboutScreen;
