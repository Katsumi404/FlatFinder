import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Button, Text, ImageBackground } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate('Main', { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
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
      <Text style={{ color: 'white' }}>{errorMessage}</Text>

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