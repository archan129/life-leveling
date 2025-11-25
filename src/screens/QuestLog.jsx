import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import QuestCard from '../components/QuestCard';
import colors from '../styles/colors';
import { completeTask } from '../utils/leveling';
import questsData from '../data/quests';


export default function QuestLog({ user, setUser }) {
    const [quests, setQuests] = React.useState(questsData);;
    const handleComplete = (quest) => {

        const today = new Date().toDateString();

        // Reset daily counter if it's a new day
        if (quest.lastCompletedDate !== today) {
            quest.timesCompletedToday = 0;
            quest.lastCompletedDate = today;

        }



        // Count today's completion
        const updatedQuest = {
            ...quest,
            timesCompletedToday: quest.timesCompletedToday + 1,
            lastCompletedDate: today,
        };

        // Check if daily limit hit
        if (quest.dailyLimit && quest.timesCompletedToday == quest.dailyLimit) {
            alert("Daily limit reached for this quest.");
            return;
        }
        // Calculate XP for user and stats
        const result = completeTask(user, quest);

        // Update state
        setUser({ ...result.user });

        // Mark quest as completed
        // Update quest progress
        const updatedQuests = quests.map(q =>
            q.id === quest.id ? updatedQuest : q
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



    return (
        <ScrollView style={styles.container}>
            {quests.map((q) => (
                <QuestCard key={q.id} quest={q} onComplete={() => handleComplete(q)} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
});
