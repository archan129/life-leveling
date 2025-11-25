import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './src/screens/Dashboard';
import QuestLog from './src/screens/QuestLog';
import CharacterScreen from './src/screens/CharacterScreen';

import { user as initialUser } from './src/data/sampleData';



const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(initialUser);
  //const [quests, setQuests] = useState(initialQuests);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
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
