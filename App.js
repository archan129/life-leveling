import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './src/screens/Dashboard';
import QuestLog from './src/screens/QuestLog';
import CharacterScreen from './src/screens/CharacterScreen';

import NewUserScreen from './src/screens/NewUserScreen';


import { user as initialUser } from './src/data/sampleData';



const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    const loadName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('@character_name');
        if (savedName) {
          setUser(prev => ({ ...prev, name: savedName }));
          setIsNewUser(false); // user exists
        }
      } catch (e) {
        console.log("Error loading name", e);
      } finally {
        setLoading(false);
      }
    };
    loadName();
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
