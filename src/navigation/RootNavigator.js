import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuScreen from '../screens/MenuScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';
import ResultsScreen from '../screens/ResultsScreen';
import StatsScreen from '../screens/StatsScreen';
import AboutScreen from '../screens/AboutScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {colors} from '../theme';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [loading, setLoading] = useState(true);
    const [onboardingDone, setOnboardingDone] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem('@onboarding_done');
                setOnboardingDone(!!saved);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator color={colors.accent} />
            </View>
        );
    }

    const handleOnboardingFinish = async navigation => {
        try {
            await AsyncStorage.setItem('@onboarding_done', '1');
        } catch (e) {
        }
        setOnboardingDone(true);
        navigation.replace('Menu');
    };

    return (
        <Stack.Navigator
            initialRouteName={onboardingDone ? 'Menu' : 'Onboarding'}
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {backgroundColor: colors.bg},
            }}>
            <Stack.Screen name="Onboarding">
                {props => (
                    <OnboardingScreen
                        {...props}
                        onFinish={() => handleOnboardingFinish(props.navigation)}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
