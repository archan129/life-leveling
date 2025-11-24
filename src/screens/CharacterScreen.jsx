import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import StatBar from '../components/StatBar';
import AbilityCard from '../components/AbilityCard';
import colors from '../styles/colors';
import { abilities } from '../data/abilities';

export default function CharacterScreen({ user }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Character</Text>

            <View style={styles.statsContainer}>
                {Object.keys(user.stats).map(stat => (
                    <StatBar
                        key={stat}
                        name={stat}
                        xp={user.stats[stat].xp}
                        level={user.stats[stat].level}
                        gainedXP={user.stats[stat].lastGainedXP || 0} // <-- new
                    />

                ))}
            </View>

            <Text style={styles.subtitle}>Abilities</Text>
            <View style={styles.abilitiesContainer}>
                {abilities.map(ab => (
                    <AbilityCard key={ab.id} ability={ab} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 20 },
    subtitle: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginVertical: 12 },
    statsContainer: { backgroundColor: colors.card, padding: 12, borderRadius: 12, marginBottom: 20 },
    abilitiesContainer: {},


});
