import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translations} from '../i18n/translations';

const STORAGE_KEY = '@language';
const LanguageContext = createContext(null);

export const LanguageProvider = ({children}) => {
    const [lang, setLang] = useState('en');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) {
                    setLang(saved);
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
        AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => {});
    }, [lang, ready]);

    const t = useCallback(
        key => {
            const table = translations[lang] || translations.en;
            return table[key] || translations.en[key] || key;
        },
        [lang],
    );

    return (
        <LanguageContext.Provider value={{lang, setLang, t, ready}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
