import { isQuestAvailable } from "../utils/isQuestAvailable";


export const quests = [
    {
        id: 1,
        title: 'Do 10 push-ups',
        description: 'A quick set of push-ups to build your strength.',
        difficulty: 10,
        statMap: { Strength: 1 },
        statRatio: [5, 3, 2],
        type: 'daily',
        repeatable: true,
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
        //dailyLimit: 2,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 3,
        title: 'Drink water',
        description: 'Stay hydrated to maintain your agility.',
        difficulty: 1,
        statMap: { Health: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 4,
        title: 'Run a mile',
        description: 'Do some intense cardio to boost endurence',
        difficulty: 1,
        statMap: { Endurance: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 5,
        title: 'Call a Friend',
        description: 'Call a friend and have a nice convo',
        difficulty: 1,
        statMap: { Charisma: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 6,
        title: 'Meditate for 5 min',
        description: 'Sit alone with your thoughts',
        difficulty: 1,
        statMap: { Mindfulness: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 7,
        title: 'Wake Up',
        description: 'Wake up at a set time',
        difficulty: 1,
        statMap: { Discipline: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,
    },

    {
        id: 8,
        title: 'Eat Lunch',
        description: 'Nourish your body at a set time',
        difficulty: 1,
        statMap: { Discipline: 1 },
        type: 'daily',
        repeatable: true,
        //dailyLimit: 10,
        timesCompletedToday: 0,
        lastCompletedDate: null,
        completed: false,

        availableFrom: "10:00",   // 11 AM
        availableTo: "14:00",     // 2 PM
    },
];




export default quests;
