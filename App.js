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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2HrMDOAhbdy01ceY6oYs4tRd2EDRHbcE",
  authDomain: "flatfinder-f1f62.firebaseapp.com",
  databaseURL: "https://flatfinder-f1f62-default-rtdb.firebaseio.com",
  projectId: "flatfinder-f1f62",
  storageBucket: "flatfinder-f1f62.appspot.com",
  messagingSenderId: "305766468407",
  appId: "1:305766468407:web:7b765efd38ffeb267768b2",
  measurementId: "G-80K8EN5VNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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