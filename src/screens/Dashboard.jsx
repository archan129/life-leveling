import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function xpForNextLevel(level) {
    return Math.floor(50 + Math.pow(level, 2) * 5);
}


export default function Dashboard({ navigation, user }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Archan</Text>

            <View style={styles.statsContainer}>
                <View style={styles.card}>
                    <Text style={styles.statLabel}>Level</Text>
                    <Text style={styles.statValue}>{user.globalLevel}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.statLabel}>XP to Next Level</Text>
                    <Text style={styles.statValue}>
                        {xpForNextLevel(user.globalLevel) - Math.floor(user.globalXP)}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('QuestLog')} style={styles.button}>
                <Text style={styles.buttonText}>Quest Log</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Character')} style={styles.button}>
                <Text style={styles.buttonText}>Character</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.textPrimary
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    card: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.card,
        borderRadius: 14,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
    statLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 5,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    button: {
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
});
