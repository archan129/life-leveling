import colors from '../styles/colors';
import React, { useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestCard({ quest, onComplete }) {


    const isDisabled = quest.dailyLimit && quest.timesCompletedToday >= quest.dailyLimit;

    const handlePress = () => {
        if (isDisabled) {
            Alert.alert(
                "Daily Limit Reached",
                `You can only do "${quest.title}" ${quest.dailyLimit} times today.`
            );
            return;
        }
        onComplete(quest);
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{quest.title}</Text>
            <Text style={styles.description}>{quest.description}</Text>

            <Text style={styles.difficulty}>Difficulty: {quest.difficulty}</Text>
            <Text style={styles.limitText}>
                {quest.dailyLimit
                    ? `Used ${quest.timesCompletedToday}/${quest.dailyLimit} today`
                    : 'No daily limit'}
            </Text>
            <TouchableOpacity
                onPress={handlePress}
                style={[
                    styles.button,
                    isDisabled ? styles.disabledButton : null
                ]}
            >
                <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: colors.card,
        borderRadius: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    title: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 6 },
    description: { fontSize: 14, color: colors.textSecondary, marginBottom: 6 },

    difficulty: { fontSize: 14, color: colors.textSecondary, marginBottom: 10 },
    limitText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 8,
    },

    button: {
        padding: 12,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center'
    },
    disabledButton: {
        backgroundColor: '#555', // grey out completed quests
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});
