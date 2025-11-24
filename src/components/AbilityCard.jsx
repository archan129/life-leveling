import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function AbilityCard({ ability }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{ability.name}</Text>
            <Text style={styles.description}>{ability.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    name: { fontWeight: 'bold', fontSize: 16, color: colors.textPrimary, marginBottom: 4 },
    description: { fontSize: 14, color: colors.textSecondary },
});
