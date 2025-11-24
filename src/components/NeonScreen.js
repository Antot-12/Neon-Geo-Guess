import React, {useEffect, useRef} from 'react';
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';

const NeonScreen = ({children}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(16)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 260,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 260,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, translateY]);

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
            <View style={styles.bgLayer}>
                <View style={styles.glowTop} />
                <View style={styles.glowBottom} />
            </View>
            <Animated.View style={[styles.container, {opacity, transform: [{translateY}]}]}>
                {children}
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    bgLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.bg,
    },
    glowTop: {
        position: 'absolute',
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: colors.accentSoft,
        top: -80,
        right: -60,
        opacity: 0.9,
    },
    glowBottom: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(168,85,247,0.22)',
        bottom: -90,
        left: -80,
    },
    container: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
});

export default NeonScreen;
