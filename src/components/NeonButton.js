import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing} from '../theme';

const NeonButton = ({label, onPress, variant = 'primary', style, disabled, leftIcon}) => {
    const isSecondary = variant === 'secondary';
    const isGhost = variant === 'ghost';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({pressed}) => [
                styles.base,
                isSecondary && styles.secondary,
                !isSecondary && !isGhost && styles.primary,
                isGhost && styles.ghost,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}>
            {!isGhost && <View style={styles.glassLayer} />}
            <View style={styles.contentRow}>
                {leftIcon ? <View style={styles.iconWrapper}>{leftIcon}</View> : null}
                <Text
                    style={[
                        styles.label,
                        isSecondary && styles.labelSecondary,
                        isGhost && styles.labelGhost,
                    ]}>
                    {label}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        marginVertical: spacing.sm,
        borderRadius: 999,
        overflow: 'hidden',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        minHeight: 44,
    },
    primary: {
        backgroundColor: colors.accent,
        shadowColor: colors.accent,
        shadowOpacity: 0.45,
        shadowRadius: 14,
        shadowOffset: {width: 0, height: 0},
        elevation: 8,
    },
    secondary: {
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderWidth: 1,
        borderColor: colors.borderSubtle || 'rgba(54,244,255,0.25)',
        shadowColor: colors.shadowSoft || '#020617',
        shadowOpacity: 0.45,
        shadowRadius: 18,
        shadowOffset: {width: 0, height: 18},
        elevation: 4,
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowOpacity: 0,
    },
    pressed: {
        transform: [{scale: 0.97}],
        opacity: 0.9,
    },
    disabled: {
        opacity: 0.4,
    },
    glassLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.18,
        backgroundColor: '#ffffff',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        marginRight: spacing.xs,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.bg,
        textAlign: 'center',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    labelSecondary: {
        color: colors.text,
    },
    labelGhost: {
        color: colors.muted,
    },
});

export default NeonButton;
