export const quests = [
    {
        id: 1,
        title: 'Do 10 push-ups',
        description: 'A quick set of push-ups to build your strength.',
        difficulty: 1,
        statMap: { Strength: 1 },
        type: 'daily',
        repeatable: true,
        dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },
    {
        id: 2,
        title: 'Read 10 pages',
        description: 'Boost your intelligence by reading 10 pages of a book.',
        difficulty: 2,
        statMap: { Intelligence: 1 },
        type: 'daily',
        repeatable: true,
        dailyLimit: 2,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },
];

export default quests;
