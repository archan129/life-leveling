import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import { user as initialUser } from '../data/sampleData';

export default function SettingsScreen({ navigation, user, setUser, setHasName }) {

    const resetAllData = () => {
        Alert.alert(
            "Reset All Data",
            "Are you sure you want to reset all progress? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {

                            // Remove only the keys your app uses

                            const keysToRemove = [

                                '@character_name',
                                '@global_level',
                                '@global_xp',
                                '@quest_progress',
                                '@stats'
                            ];
                            //await AsyncStorage.multiRemove(keysToRemove);

                            // Add per-stat keys dynamically
                            Object.keys(initialUser.stats).forEach(statName => {
                                keysToRemove.push(`@stat_${statName}_level`);
                                keysToRemove.push(`@stat_${statName}_xp`);
                            });

                            // Remove all keys
                            await AsyncStorage.multiRemove(keysToRemove);

                            // Reset user state to initial values
                            setUser({
                                ...initialUser,
                                stats: JSON.parse(JSON.stringify(initialUser.stats)), // deep clone
                            });
                            console.log(user)


                            // Tell App.js to render NewUserScreen
                            setHasName(false);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'NewUser' }],
                            });

                            Alert.alert("Reset Complete", "All progress has been reset successfully!");
                            console.log("All User Data Deleted");

                        } catch (e) {
                            console.log("Error resetting data:", e);
                            Alert.alert("Error", "Failed to reset data. Please try again.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity style={styles.button} onPress={resetAllData}>
                <Text style={styles.buttonText}>Reset All Data</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 20,
    },
    button: {
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
