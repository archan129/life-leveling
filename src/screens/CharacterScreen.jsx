import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import StatBar from '../components/StatBar';
import AbilityCard from '../components/AbilityCard';
import colors from '../styles/colors';
import { abilities } from '../data/abilities';

import sprite1 from '../assets/Character1.png'; // default sprite
import sprite2 from '../assets/Character5.png'; // for level 5+




function getSpriteForLevel(level) {
    if (level >= 5) return sprite2;
    return sprite1;
}

export default function CharacterScreen({ user }) {
    const sprite = getSpriteForLevel(user.globalLevel);

    return (
        <ScrollView style={styles.container}>
            {/*<Text style={styles.title}>Archan</Text>*/}
            <Text style={styles.characterName}>{user.name || 'Player'}</Text>


            {/* Character sprite */}
            <View style={styles.spriteContainer}>
                <Image source={sprite} style={styles.sprite} />
            </View>


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
    characterName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 12,
        textAlign: 'left',
    },
    spriteContainer: { alignItems: 'center', marginBottom: 20 },
    sprite: { width: 300, height: 300 }, // Increased size
    subtitle: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginVertical: 12 },
    statsContainer: { backgroundColor: colors.card, padding: 12, borderRadius: 12, marginBottom: 20 },
    abilitiesContainer: {},
});
