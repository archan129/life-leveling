export const quests = [
    {
        id: 1,
        title: 'Do 10 push-ups',
        description: 'A quick set of push-ups to build your strength.',
        difficulty: 2,
        statMap: { Strength: 1 },
        type: 'daily',
        repeatable: true,
        maxCompletionsPerDay: 1,
        completed: false,
    },
    {
        id: 2,
        title: 'Read 10 pages',
        description: 'Boost your intelligence by reading 10 pages of a book.',
        difficulty: 1,
        statMap: { Intelligence: 1 },
        type: 'one-time',
        repeatable: false,
        completed: false,
    },
];
