import React from 'react';
//Navigation element imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
//Pages for the App imports
import LandingScreen from "./screens/LandingScreen.js";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import MainScreen from "./screens/MainScreen.js";
import MatchmakingScreen from "./screens/MatchmakingScreen.js";
import UtilitiesScreen from "./screens/UtilitiesScreen.js";
//Imports database fetching method
import { DatabaseManager } from './database/DatabaseManager.js';

//Creates way to navigate the pages
const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {     
        const dbManager  = new DatabaseManager();
        await dbManager.initialize();
        setLoading(false); // Update loading state when initialization is complete
      } catch (error) {
        console.error('Error initializing database:', error);
        // Handle error here, e.g., show an error message and allow retry
      }
    };

    initializeDatabase();
  }, []); // Run the effect only once on component mount

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="MatchmakingScreen" component={MatchmakingScreen} />
        <Stack.Screen name="UtilitiesScreen" component={UtilitiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}