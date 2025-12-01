import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QuestCard from '../components/QuestCard';
import colors from '../styles/colors';
import { completeTask } from '../utils/leveling';
import questsData from '../data/quests';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Group quests by primary stat
function groupQuestsByStat(quests) {
    const grouped = {};
    quests.forEach((quest) => {
        if (!quest.statMap || Object.keys(quest.statMap).length === 0) return;

        const primaryStat = Object.keys(quest.statMap)[0];

        if (!grouped[primaryStat]) grouped[primaryStat] = [];
        grouped[primaryStat].push(quest);
    });
    return grouped;
}

export default function QuestLog({ user, setUser }) {
    const [quests, setQuests] = useState(questsData);

    // Keep track of which categories are expanded
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (stat) => {
        setExpandedCategories(prev => ({
            ...prev,
            [stat]: !prev[stat],
        }));
    };

    const handleComplete = async (quest) => {
        const today = new Date().toDateString();

        if (!user.questProgress[quest.id]) {
            user.questProgress[quest.id] = { timesCompletedToday: 0, lastCompletedDate: today };
        }

        const progress = user.questProgress[quest.id];
        if (progress.lastCompletedDate !== today) {
            progress.timesCompletedToday = 0;
            progress.lastCompletedDate = today;
        }

        if (quest.dailyLimit && progress.timesCompletedToday >= quest.dailyLimit) {
            alert("Daily limit reached for this quest.");
            return;
        }

        progress.timesCompletedToday += 1;
        progress.lastCompletedDate = today;

        const result = await completeTask(user, quest);

        const updatedUser = { ...result.user, questProgress: { ...user.questProgress } };
        setUser(updatedUser);

        // Persist storage
        await AsyncStorage.setItem('@global_level', updatedUser.globalLevel.toString());
        await AsyncStorage.setItem('@global_xp', updatedUser.globalXP.toString());
        await AsyncStorage.setItem('@quest_progress', JSON.stringify(updatedUser.questProgress));

        // Optional: show level ups
        for (const stat in result.statLeveled) {
            alert(`${stat} leveled up! Now L${result.user.stats[stat].level}`);
        }
        if (result.globalLeveled) {
            alert(`Global Level Up! Now L${result.user.globalLevel}`);
        }
    };

    const grouped = groupQuestsByStat(quests);

    return (
        <ScrollView style={styles.container}>
            {Object.keys(grouped).map((statName) => {
                const isExpanded = expandedCategories[statName];
                return (
                    <View key={statName}>
                        <TouchableOpacity
                            style={styles.categoryHeader}
                            onPress={() => toggleCategory(statName)}
                        >
                            <Text style={styles.categoryTitle}>{statName}</Text>
                            <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
                        </TouchableOpacity>

                        {isExpanded &&
                            grouped[statName].map((q) => (
                                <QuestCard
                                    key={q.id}
                                    quest={{
                                        ...q,
                                        timesCompletedToday: user.questProgress[q.id]?.timesCompletedToday || 0
                                    }}
                                    onComplete={() => handleComplete(q)}
                                />
                            ))
                        }
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },

    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },

    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },

    arrow: {
        fontSize: 18,
        color: '#fff',
    },
});
