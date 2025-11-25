export const user = {
    globalLevel: 1,
    globalXP: 0,
    stats: {
        Strength: { level: 1, xp: 0, lastGainedXP: 0 },
        Health: { level: 1, xp: 0, lastGainedXP: 0 },
        Endurance: { level: 1, xp: 0, lastGainedXP: 0 },
        Intelligence: { level: 1, xp: 0, lastGainedXP: 0 },
        Charisma: { level: 1, xp: 0, lastGainedXP: 0 },
        Mindfulness: { level: 1, xp: 0, lastGainedXP: 0 },
        Discipline: { level: 1, xp: 0, lastGainedXP: 0 },
    },
    questProgress: {
        // questId: { timesCompletedToday: 0, lastCompletedDate: 'YYYY-MM-DD' }
    },
    characterName: '',
    isNewUser: true,
};
