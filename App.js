import React from 'react';
//Navigation element imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Pages for the App imports
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ResetPassword from "./screens/ResetPassword.js";
import MainScreen from "./screens/MainScreen.js";
import SearchScreen from './screens/SearchScreen.js';
import UtilitiesScreen from './screens/UtilitiesScreen.js';
import MatchmakingScreen from './screens/MatchmakingScreen.js';

//creates way to navigate the pages
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}} />
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
        <Stack.Screen name="Utlilities" component={UtilitiesScreen} options={{headerShown: false}} />
        <Stack.Screen name="Matchmaking" component={MatchmakingScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}