import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './src/screens/Dashboard';
import QuestLog from './src/screens/QuestLog';
import CharacterScreen from './src/screens/CharacterScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NewUserScreen from './src/screens/NewUserScreen';


import { user as initialUser } from './src/data/sampleData';



const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('@character_name');
        const savedLevel = await AsyncStorage.getItem('@global_level');
        const savedXP = await AsyncStorage.getItem('@global_xp');
        const savedQuestProgress = await AsyncStorage.getItem('@quest_progress');
        const savedStats = await AsyncStorage.getItem('@stats');


        const loadedStats = {};
        for (const statName in initialUser.stats) {
          const savedStatLevel = await AsyncStorage.getItem(`@stat_${statName}_level`);
          const savedStatXP = await AsyncStorage.getItem(`@stat_${statName}_xp`);
          loadedStats[statName] = {
            level: savedStatLevel ? parseInt(savedStatLevel, 10) : initialUser.stats[statName].level,
            xp: savedStatXP ? parseInt(savedStatXP, 10) : initialUser.stats[statName].xp,
            lastGainedXP: 0,
          };
        }

        setUser(prev => ({
          ...prev,
          name: savedName || prev.name,
          globalLevel: savedLevel ? parseInt(savedLevel, 10) : prev.globalLevel,
          globalXP: savedXP ? parseInt(savedXP, 10) : prev.globalXP,
          questProgress: savedQuestProgress ? JSON.parse(savedQuestProgress) : {},
          stats: savedStats ? JSON.parse(savedStats) : prev.stats,
        }));

        setHasName(!!savedName);
      } catch (e) {
        console.log('Error loading user data:', e);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return null; // or a splash screen





  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={hasName ? "Dashboard" : "NewUser"}>
        {!hasName && (
          <Stack.Screen name="NewUser">
            {props => <NewUserScreen {...props} setUser={setUser} setHasName={setHasName} />}
          </Stack.Screen>
        )}

        <Stack.Screen name="Settings">
          {props => <SettingsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {props => <Dashboard {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="QuestLog">
          {props => <QuestLog {...props} user={user} setUser={setUser} />}
        </Stack.Screen>

        <Stack.Screen name="Character">
          {props => <CharacterScreen {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
