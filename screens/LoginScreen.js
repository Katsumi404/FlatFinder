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

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  }

  return (
    <ImageBackground style={AppStyle.container} source={localImage}>
      <Text style={LoginStyle.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Update the username state
        style={LoginStyle.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Update the password state
        secureTextEntry={true} // Hide password input
        style={LoginStyle.input}
      />
      <Text style={{ color: '#77DD77' }}>Don't have an account? <InlineTextButton text="Sign up" onPress={handleSignUp}/></Text>
      <Text style={{ color: '#77DD77' }}>Forgotten your password?<InlineTextButton text="Reset" onPress={handleForgotPassword}/></Text>
      <Button 
        title="Login" 
        onPress={handleLogin} 
        style={LoginStyle.button} 
        color='green' 
      />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}