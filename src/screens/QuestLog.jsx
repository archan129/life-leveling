import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import QuestCard from '../components/QuestCard';
import colors from '../styles/colors';
import { completeTask } from '../utils/leveling';
import questsData from '../data/quests';
import { isQuestAvailable } from "../utils/isQuestAvailable";


import AsyncStorage from '@react-native-async-storage/async-storage';


function groupQuestsByStat(quests) {
    const grouped = {};

    quests.forEach((quest) => {
        if (!quest.statMap || Object.keys(quest.statMap).length === 0) return;

        // Use the first key as the primary stat
        const primaryStat = Object.keys(quest.statMap)[0];

        if (!grouped[primaryStat]) grouped[primaryStat] = [];
        grouped[primaryStat].push(quest);
    });

    return grouped;
}




export default function QuestLog({ user, setUser }) {
    const [quests, setQuests] = React.useState(questsData);;
    const handleComplete = async (quest) => {

        const today = new Date().toDateString();



        // Initialize quest progress if not exists
        if (!user.questProgress[quest.id]) {
            user.questProgress[quest.id] = { timesCompletedToday: 0, lastCompletedDate: today };
        }

        const progress = user.questProgress[quest.id];
        // Reset daily counter if it's a new day
        if (progress.lastCompletedDate !== today) {
            progress.timesCompletedToday = 0;
            progress.lastCompletedDate = today;

        }



        // Count today's completion
        const updatedQuest = {
            ...quest,
            timesCompletedToday: quest.timesCompletedToday + 1,
            lastCompletedDate: today,
        };

        // Check if daily limit hit
        if (quest.dailyLimit && progress.timesCompletedToday == quest.dailyLimit) {
            alert("Daily limit reached for this quest.");
            return;
        }

        // Increment daily count
        progress.timesCompletedToday += 1;
        progress.lastCompletedDate = today;

        // Calculate XP for user and stats
        const result = await completeTask(user, quest);

        // Update state
        const updatedUser = { ...result.user, questProgress: { ...user.questProgress } };
        setUser(updatedUser);

        //Persist User Storage
        await AsyncStorage.setItem('@global_level', updatedUser.globalLevel.toString());
        await AsyncStorage.setItem('@global_xp', updatedUser.globalXP.toString());
        await AsyncStorage.setItem('@quest_progress', JSON.stringify(updatedUser.questProgress));



        // Mark quest as completed
        // Update quest progress
        const updatedQuests = quests.map(q =>
            q.id === quest.id ? { ...q, timesCompletedToday: progress.timesCompletedToday } : q
        );
        setQuests(updatedQuests); // <-- we need a state for quests

        // Optional: show which stats leveled up
        for (const stat in result.statLeveled) {
            alert(`${stat} leveled up! Now L${result.user.stats[stat].level}`);
        }

        // Optional: show global level-up
        if (result.globalLeveled) {
            alert(`Global Level Up! Now L${result.user.globalLevel}`);
        }
    };

    const grouped = groupQuestsByStat(quests, "primary");


    return (
        <ScrollView style={styles.container}>
            {Object.keys(grouped).map(statName => (
                <View key={statName}>
                    <Text style={styles.categoryTitle}>{statName}</Text>

                    {grouped[statName].map((q) => (
                        <QuestCard
                            key={q.id}
                            quest={{
                                ...q,
                                timesCompletedToday: user.questProgress[q.id]?.timesCompletedToday || 0
                            }}
                            onComplete={() => handleComplete(q)}
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background
    },

    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
});

