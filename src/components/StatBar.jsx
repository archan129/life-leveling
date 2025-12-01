import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { xpForNextLevel } from '../utils/leveling'; // <-- IMPORTANT

export default function StatBar({ name, xp, level, gainedXP }) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const gainAnim = useRef(new Animated.Value(0)).current;
  const [showGain, setShowGain] = useState(false);

  // Use the REAL formula from leveling.js
  const requiredXP = Math.floor(50 + Math.pow(level, 2) * 5);
  const progressFraction = Math.min(xp / requiredXP, 1); // 0–1

  // Animate bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressFraction,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // XP Gain Floating Animation
    if (gainedXP && gainedXP > 0) {
      setShowGain(true);
      gainAnim.setValue(0);

      Animated.timing(gainAnim, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowGain(false));
    }
  }, [xp, level]);

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ marginBottom: 14, position: 'relative' }}>
      <Text style={styles.label}>
        {name} L{level} • {Math.floor(xp)}/{requiredXP} XP
      </Text>

      {showGain && (
        <Animated.View
          style={[
            styles.gainContainer,
            { transform: [{ translateY: gainAnim }] }
          ]}
        >
          <LinearGradient
            colors={['#feae51', '#973cbf']}
            style={styles.gainGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.gainText}>+{gainedXP} XP</Text>
          </LinearGradient>
        </Animated.View>
      )}

      <View style={styles.barBackground}>
        <Animated.View style={{ width }}>
          <LinearGradient
            colors={['#feae51', '#973cbf']}
            style={styles.barFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: '#ffffff',
    fontWeight: '600'
  },
  barBackground: {
    height: 8,
    backgroundColor: '#333344',
    borderRadius: 4,
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: 4
  },
  gainContainer: {
    position: 'absolute',
    left: 0,
    top: -20
  },
  gainGradient: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  gainText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
});
