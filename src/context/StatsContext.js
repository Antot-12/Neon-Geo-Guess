import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@stats';

const defaultStats = {
    gamesPlayed: 0,
    bestScore: 0,
    totalDistanceKm: 0,
    totalGuesses: 0,
};

const StatsContext = createContext({
    ...defaultStats,
    ready: false,
    registerGame: () => {},
});

export const StatsProvider = ({children}) => {
    const [stats, setStats] = useState(defaultStats);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setStats({...defaultStats, ...parsed});
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
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stats)).catch(() => {});
    }, [stats, ready]);

    const registerGame = ({score, totalDistanceKm, guessesCount}) => {
        setStats(prev => {
            const gamesPlayed = prev.gamesPlayed + 1;
            const bestScore = score > prev.bestScore ? score : prev.bestScore;
            const totalDistance = prev.totalDistanceKm + (totalDistanceKm || 0);
            const totalGuesses = prev.totalGuesses + (guessesCount || 0);
            return {
                gamesPlayed,
                bestScore,
                totalDistanceKm: totalDistance,
                totalGuesses,
            };
        });
    };

    return (
        <StatsContext.Provider
            value={{
                ...stats,
                ready,
                registerGame,
            }}>
            {children}
        </StatsContext.Provider>
    );
};

export const useStats = () => useContext(StatsContext);
