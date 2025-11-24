export const QUICK_MODE_ROUNDS = 5;
export const ARCADE_ROUND_SECONDS = 40;

const verdictThresholds = [
    {max: 1, verdict: 'perfect'},
    {max: 10, verdict: 'very_close'},
    {max: 100, verdict: 'close'},
    {max: 1000, verdict: 'far'},
    {max: Infinity, verdict: 'very_far'},
];

const basePointsByVerdict = {
    perfect: 320,
    very_close: 240,
    close: 170,
    far: 90,
    very_far: 40,
};

const difficultyMultipliers = {
    easy: 1,
    normal: 1.3,
    hard: 1.6,
};

const lifePenaltyThresholdKm = {
    easy: 4000,
    normal: 2500,
    hard: 1500,
};

export function getVerdictForDistance(distanceKm) {
    const d = Number.isFinite(distanceKm) && distanceKm >= 0 ? distanceKm : Infinity;
    for (let i = 0; i < verdictThresholds.length; i += 1) {
        if (d <= verdictThresholds[i].max) {
            return verdictThresholds[i].verdict;
        }
    }
    return 'very_far';
}

export function getPointsForDistance(distanceKm, difficulty = 'normal') {
    const verdict = getVerdictForDistance(distanceKm);
    const base = basePointsByVerdict[verdict] ?? 0;
    const mult = difficultyMultipliers[difficulty] ?? difficultyMultipliers.normal;
    const points = Math.round(base * mult);
    return points;
}

export function getLivesDelta(distanceKm, difficulty = 'normal') {
    const threshold = lifePenaltyThresholdKm[difficulty] ?? lifePenaltyThresholdKm.normal;
    if (!Number.isFinite(distanceKm)) {
        return -1;
    }
    if (distanceKm > threshold) {
        return -1;
    }
    return 0;
}
