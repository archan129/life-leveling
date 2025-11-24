import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import QuestCard from '../components/QuestCard';
import colors from '../styles/colors';
import { completeTask } from '../utils/leveling';

export default function QuestLog({ user, setUser }) {
    const [quests, setQuests] = React.useState([
        { id: 1, title: 'Do 10 push-ups', description: 'Simple push-ups to get started', difficulty: 2, statMap: { Agility: 1 } },
        { id: 2, title: 'Read 10 pages', description: 'Read to improve your knowledge', difficulty: 1, statMap: { Intelligence: 1 } },
    ]);
    const handleComplete = (quest) => {

        // Calculate XP for user and stats
        const result = completeTask(user, quest);

        // Update state
        setUser({ ...result.user });

        // Mark quest as completed
        const updatedQuests = quests.map(q =>
            q.id === quest.id ? { ...q, completed: true } : q
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
