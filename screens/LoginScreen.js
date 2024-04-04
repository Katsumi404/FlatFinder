import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Button, Text, ImageBackground } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';

export default function LoginScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');

  if (auth.currentUser) {
    navigation.navigate('Main');
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Main');
      }
    });
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
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
      <Text style={{ color: 'white' }}>{errorMessage}</Text>

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
        style={AppStyle.button} 
        color='green' 
      />
      
      <Text style={{ color: 'green' }}><InlineTextButton text="Forgot password?" onPress={handleForgotPassword}/></Text>
      <Text style={{ color: 'green' }}>Don't have an account? <InlineTextButton text="Sign up" onPress={handleSignUp}/></Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}