import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function NewUserScreen({ setUser, navigation }) {
    const [name, setName] = useState('');


    const handleSubmit = async () => {
        if (!name.trim()) return Alert.alert("Please enter a name");

        try {
            await AsyncStorage.setItem('@character_name', name);
            setUser(prev => ({ ...prev, name }));
            setHasName(true);            // mark that user has a name
            navigation.replace('Dashboard'); // go to main screen
        } catch (e) {
            console.log("Error saving name", e);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Enter your character name:</Text>

            <TextInput
                style={styles.input}
                placeholder="Character Name"
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
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
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    input: {
        width: '80%',
        padding: 12,
        borderColor: colors.textSecondary,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        color: colors.textPrimary,
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
