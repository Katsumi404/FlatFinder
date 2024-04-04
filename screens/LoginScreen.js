import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Button, Text, ImageBackground } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';

export default function LoginScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Here, you would put your login logic or navigation to home screen after successful login
    alert('Username: ' + username + ', Password: ' + password);
    navigation.navigate('Main');
  };

  const handleForgotPassword = () => {
    alert('Forgot Password button pressed');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  }

  return (
    <ImageBackground style={AppStyle.container} source={localImage}>
      <Text style={LoginStyle.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Update the username state
        style={LoginStyle.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Update the password state
        secureTextEntry={true} // Hide password input
        style={LoginStyle.input}
      />
      <Button 
        title="Login" 
        onPress={handleLogin} 
        style={LoginStyle.button} 
        color='green' 
      />
      <Button 
        title="Forgot Password?" 
        onPress={handleForgotPassword} 
        style={LoginStyle.button} 
        color='gray' 
      />
      <Text style={{ color: 'green' }}>Don't have an account? <InlineTextButton text="Sign up" onPress={handleSignUp}/></Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}