import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {locations} from '../data/locations';
import {
    ARCADE_ROUND_SECONDS,
    QUICK_MODE_ROUNDS,
    getLivesDelta,
    getPointsForDistance,
    getVerdictForDistance,
} from '../config/scoring';

const EARTH_RADIUS_KM = 6371;

const toRad = value => (value * Math.PI) / 180;

const distanceKmBetween = (a, b) => {
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const h =
        sinDLat * sinDLat +
        Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return EARTH_RADIUS_KM * c;
};

const shuffle = list => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = copy[i];
        copy[i] = copy[j];
        copy[j] = tmp;
    }
    return copy;
};

const filterByDifficulty = (list, difficulty) => {
    if (difficulty === 'easy') {
        const filtered = list.filter(it => it.difficulty === 'easy');
        return filtered.length ? filtered : list;
    }
    if (difficulty === 'hard') {
        const filtered = list.filter(
            it => it.difficulty === 'hard' || it.difficulty === 'normal',
        );
        return filtered.length ? filtered : list;
    }
    const filtered = list.filter(
        it => it.difficulty === 'easy' || it.difficulty === 'normal',
    );
    return filtered.length ? filtered : list;
};

export const useGameEngine = (mode, difficulty) => {
    const isArcade = mode === 'arcade';

    const pool = useMemo(() => {
        const filtered = filterByDifficulty(locations, difficulty);
        return shuffle(filtered);
    }, [difficulty]);

    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);

    const [guessCoord, setGuessCoord] = useState(null);
    const [distanceKm, setDistanceKm] = useState(null);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [lastPoints, setLastPoints] = useState(0);
    const [lastVerdict, setLastVerdict] = useState(null);
    const [wasTimeout, setWasTimeout] = useState(false);

    const [timeLeft, setTimeLeft] = useState(isArcade ? ARCADE_ROUND_SECONDS : null);

    const [history, setHistory] = useState([]);

    const timerRef = useRef(null);

    const maxRounds = isArcade ? Infinity : QUICK_MODE_ROUNDS;

    const currentLocation = useMemo(() => {
        if (!pool.length) return null;
        const index = (round - 1) % pool.length;
        return pool[index];
    }, [pool, round]);

    const resetRoundState = useCallback(() => {
        setGuessCoord(null);
        setDistanceKm(null);
        setHasGuessed(false);
        setLastPoints(0);
        setLastVerdict(null);
        setWasTimeout(false);
        if (isArcade) {
            setTimeLeft(ARCADE_ROUND_SECONDS);
        } else {
            setTimeLeft(null);
        }
    }, [isArcade]);

    const resetGame = useCallback(() => {
        setRound(1);
        setScore(0);
        setLives(3);
        setStreak(0);
        setHistory([]);
        resetRoundState();
    }, [resetRoundState]);

    useEffect(() => {
        resetGame();
    }, [resetGame, mode, difficulty, pool.length]);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const buildSummary = useCallback(() => {
        const distances = history
            .map(h => h.distanceKm)
            .filter(d => typeof d === 'number' && Number.isFinite(d));

        const bestDistanceKm =
            distances.length > 0 ? Math.min(...distances) : null;
        const avgDistanceKm =
            distances.length > 0
                ? Math.round(
                    distances.reduce((acc, d) => acc + d, 0) / distances.length,
                )
                : null;

        return {
            totalScore: score,
            roundsPlayed: history.length,
            bestDistanceKm,
            avgDistanceKm,
            livesLeft: lives,
            mode,
            difficulty,
        };
    }, [history, score, lives, mode, difficulty]);

    const handleTimeout = useCallback(() => {
        if (!isArcade) return;
        if (!currentLocation) return;
        if (hasGuessed) return;

        const timeoutDistance = 20000;
        const verdict = getVerdictForDistance(timeoutDistance);
        const points = getPointsForDistance(timeoutDistance, difficulty);
        const livesDelta = getLivesDelta(timeoutDistance, difficulty);
        const rounded = Math.round(timeoutDistance);

        setHasGuessed(true);
        setDistanceKm(rounded);
        setLastVerdict(verdict);
        setLastPoints(points);
        setWasTimeout(true);
        setScore(prev => prev + points);
        setStreak(0);
        if (livesDelta) {
            setLives(prev => Math.max(0, prev + livesDelta));
        }
        setHistory(prev => [
            ...prev,
            {
                round,
                locationId: currentLocation.id,
                distanceKm: rounded,
                points,
                verdict,
                timeout: true,
                skipped: false,
            },
        ]);
    }, [currentLocation, difficulty, hasGuessed, isArcade, round]);

    useEffect(() => {
        stopTimer();
        if (!isArcade) {
            return;
        }
        if (!currentLocation || hasGuessed) {
            return;
        }
        setTimeLeft(ARCADE_ROUND_SECONDS);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev == null) return null;
                if (prev <= 1) {
                    stopTimer();
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            stopTimer();
        };
    }, [isArcade, currentLocation, hasGuessed, handleTimeout, stopTimer]);

    const handleGuessCoord = useCallback(coord => {
        setGuessCoord(coord);
    }, []);

    const lockGuess = useCallback(() => {
        if (!currentLocation || !guessCoord || hasGuessed) {
            return false;
        }

        stopTimer();

        const distance = distanceKmBetween(
            {lat: currentLocation.lat, lon: currentLocation.lon},
            {lat: guessCoord.lat, lon: guessCoord.lon},
        );
        const rounded = Math.round(distance);

        const verdict = getVerdictForDistance(distance);
        const points = getPointsForDistance(distance, difficulty);
        const livesDelta = getLivesDelta(distance, difficulty);

        setHasGuessed(true);
        setDistanceKm(rounded);
        setLastVerdict(verdict);
        setLastPoints(points);
        setWasTimeout(false);

        setScore(prev => prev + points);
        setStreak(prev => (points > 0 ? prev + 1 : 0));

        if (livesDelta) {
            setLives(prev => Math.max(0, prev + livesDelta));
        }

        setHistory(prev => [
            ...prev,
            {
                round,
                locationId: currentLocation.id,
                distanceKm: rounded,
                points,
                verdict,
                timeout: false,
                skipped: false,
            },
        ]);

        return true;
    }, [currentLocation, guessCoord, hasGuessed, difficulty, round, stopTimer]);

    const goToNextInternal = useCallback(() => {
        resetRoundState();
        setRound(prev => prev + 1);
    }, [resetRoundState]);

    const nextRound = useCallback(() => {
        const noLives = lives <= 0;
        const lastRoundReached = !isArcade && round >= maxRounds;

        if (noLives || lastRoundReached) {
            stopTimer();
            return {
                finished: true,
                summary: buildSummary(),
            };
        }

        goToNextInternal();
        return {
            finished: false,
        };
    }, [buildSummary, goToNextInternal, isArcade, lives, maxRounds, round, stopTimer]);

    const skipRound = useCallback(() => {
        stopTimer();

        setStreak(0);

        if (!hasGuessed && currentLocation) {
            setHistory(prev => [
                ...prev,
                {
                    round,
                    locationId: currentLocation.id,
                    distanceKm: null,
                    points: 0,
                    verdict: 'skipped',
                    timeout: false,
                    skipped: true,
                },
            ]);
        }

        const noLives = lives <= 0;
        const lastRoundReached = !isArcade && round >= maxRounds;

        if (noLives || lastRoundReached) {
            return {
                finished: true,
                summary: buildSummary(),
            };
        }

        goToNextInternal();
        return {
            finished: false,
        };
    }, [
        buildSummary,
        currentLocation,
        goToNextInternal,
        hasGuessed,
        isArcade,
        lives,
        maxRounds,
        round,
        stopTimer,
    ]);

    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, [stopTimer]);

    return {
        round,
        maxRounds,
        score,
        lives,
        streak,
        currentLocation,
        guessCoord,
        distanceKm,
        hasGuessed,
        lastPoints,
        lastVerdict,
        wasTimeout,
        timeLeft,
        lockGuess,
        skipRound,
        nextRound,
        handleGuessCoord,
    };
};
