import React from 'react';
//Navigation element imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Pages for the App imports
import LandingScreen from "./screens/LandingScreen.js";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import MainScreen from "./screens/MainScreen.js";
//Imports database fetching method
import { CreateDatabase } from './database/CreateDatabase.js';
import { InsertData } from './database/InsertData.js';
CreateDatabase();
InsertData();

//Creates way to navigate the pages
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}