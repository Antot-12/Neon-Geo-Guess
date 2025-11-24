import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {LanguageProvider} from './src/context/LanguageContext';
import {SettingsProvider} from './src/context/SettingsContext';
import {StatsProvider} from './src/context/StatsContext';
import {colors} from './src/theme';

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.bg,
    },
};

export default function App() {
    return (
        <LanguageProvider>
            <SettingsProvider>
                <StatsProvider>
                    <NavigationContainer theme={navTheme}>
                        <RootNavigator />
                    </NavigationContainer>
                </StatsProvider>
            </SettingsProvider>
        </LanguageProvider>
    );
}
