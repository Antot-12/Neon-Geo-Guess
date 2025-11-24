import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useLanguage} from '../context/LanguageContext';
import {colors, radius, spacing} from '../theme';

const LanguageSwitcher = () => {
    const {lang, setLang, t} = useLanguage();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{t('language_switcher_label')}</Text>
            <View style={styles.switchRow}>
                <Pressable
                    onPress={() => setLang('en')}
                    style={[styles.switchButton, lang === 'en' && styles.switchButtonActive]}>
                    <Text style={[styles.switchText, lang === 'en' && styles.switchTextActive]}>EN</Text>
                </Pressable>
                <Pressable
                    onPress={() => setLang('uk')}
                    style={[styles.switchButton, lang === 'uk' && styles.switchButtonActive]}>
                    <Text style={[styles.switchText, lang === 'uk' && styles.switchTextActive]}>UA</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.md,
    },
    label: {
        color: colors.muted,
        fontSize: 13,
        marginBottom: spacing.xs,
    },
    switchRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderRadius: radius.lg,
        padding: spacing.xs,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
    },
    switchButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchButtonActive: {
        backgroundColor: 'rgba(34,211,238,0.12)',
    },
    switchText: {
        color: colors.muted,
        fontSize: 14,
        fontWeight: '600',
    },
    switchTextActive: {
        color: colors.text,
    },
});

export default LanguageSwitcher;
