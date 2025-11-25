import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import colors from '../styles/colors';

export default function SettingsScreen({ navigation }) {
    const handleResetData = () => {
        Alert.alert(
            "Reset All Data",
            "Are you sure you want to reset all progress? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Reset", style: "destructive", onPress: () => console.log("Resetting data...") }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.button} onPress={handleResetData}>
                <Text style={styles.buttonText}>Reset All Progress</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20 },
    button: {
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
