import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function QuestCard({ quest, onComplete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{quest.title}</Text>
            <Text style={styles.description}>{quest.description}</Text>

            <Text style={styles.difficulty}>Difficulty: {quest.difficulty}</Text>

            <TouchableOpacity onPress={() => onComplete(quest)} style={styles.button}>
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
