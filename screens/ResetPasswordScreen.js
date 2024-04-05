import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Button, Text, ImageBackground } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { auth } from "../firebase.js";
import { sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = React.useState("");
  
  let handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const handleSignUp = () => {
    navigation.navigate('Register');
  }
  return (
    <ImageBackground style={AppStyle.container} source={localImage}>
      <Text style={LoginStyle.title}>Reset</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Update the username state
        style={LoginStyle.input}
      />
      <Text style={{ color: '#77DD77' }}>Don't have an account? <InlineTextButton text="Sign up" onPress={handleSignUp}/></Text>
      <Button 
        title="Reset" 
        onPress={handleReset} 
        style={AppStyle.button} 
        color='green' 
      />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}