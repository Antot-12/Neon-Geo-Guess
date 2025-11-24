import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@settings';

const defaultSettings = {
    difficulty: 'normal',
    soundEnabled: true,
    vibrationEnabled: true,
};

const SettingsContext = createContext({
    ...defaultSettings,
    ready: false,
    setDifficulty: () => {},
    setSoundEnabled: () => {},
    setVibrationEnabled: () => {},
});

export const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useState(defaultSettings);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setSettings({...defaultSettings, ...parsed});
                }
            } catch (e) {
            } finally {
                setReady(true);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!ready) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(() => {});
    }, [settings, ready]);

    const setDifficulty = value => {
        setSettings(prev => ({...prev, difficulty: value}));
    };

    const setSoundEnabled = value => {
        setSettings(prev => ({...prev, soundEnabled: value}));
    };

    const setVibrationEnabled = value => {
        setSettings(prev => ({...prev, vibrationEnabled: value}));
    };

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                ready,
                setDifficulty,
                setSoundEnabled,
                setVibrationEnabled,
            }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
