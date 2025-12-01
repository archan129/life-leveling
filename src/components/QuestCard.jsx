import colors from '../styles/colors';
import React from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestCard({ quest, onComplete, disabled, lockedReason }) {

    const isDailyLimitReached =
        quest.dailyLimit && quest.timesCompletedToday >= quest.dailyLimit;

    const fullyDisabled = disabled || isDailyLimitReached;

    const handlePress = () => {
        if (fullyDisabled) {
            Alert.alert(
                "Quest Locked",
                lockedReason
                    ? lockedReason
                    : `Daily limit reached: ${quest.timesCompletedToday}/${quest.dailyLimit}`
            );
            return;
        }

        onComplete(quest);
    };

    return (
        <View style={[styles.card, fullyDisabled && styles.cardDisabled]}>
            <Text style={styles.title}>{quest.title}</Text>
            <Text style={styles.description}>{quest.description}</Text>

            <Text style={styles.difficulty}>Difficulty: {quest.difficulty}</Text>

            {quest.dailyLimit ? (
                <Text style={styles.limitText}>
                    Completed {quest.timesCompletedToday}/{quest.dailyLimit}
                </Text>
            ) : null}

            {lockedReason && (
                <Text style={styles.lockedReason}>
                    ⏱ {lockedReason}
                </Text>
            )}

            <TouchableOpacity
                onPress={handlePress}
                style={[styles.button, fullyDisabled && styles.disabledButton]}
            >
                <Text style={styles.buttonText}>
                    {fullyDisabled ? "Locked" : "Complete"}
                </Text>
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

    cardDisabled: {
        opacity: 0.55,
    },

    title: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 6 },
    description: { fontSize: 14, color: colors.textSecondary, marginBottom: 6 },

    difficulty: { fontSize: 14, color: colors.textSecondary, marginBottom: 10 },

    limitText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 8,
    },

    lockedReason: {
        fontSize: 12,
        color: '#ffcc66',
        marginBottom: 8,
        fontWeight: '600',
    },

    button: {
        padding: 12,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center'
    },

    disabledButton: {
        backgroundColor: '#555',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});
