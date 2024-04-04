import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Button, Text, ImageBackground } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';

export default function LoginScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Here, you would put your login logic or navigation to home screen after successful login
    alert('Email: ' + email + ', Password: ' + password);
    navigation.navigate('Main');
  };

  const toLogin = () => {
    navigation.pop();
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
      <Text style={{ color: '#77DD77' }}>Go back to login?<InlineTextButton text="Login" onPress={toLogin}/></Text>
      <Button 
        title="Reset" 
        onPress={handleLogin} 
        style={LoginStyle.button} 
        color='green' 
      />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}