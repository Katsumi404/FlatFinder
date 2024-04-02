import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Here, you would put your login logic or navigation to home screen after successful login
    alert('Username: ' + username + ', Password: ' + password);
  };

  const handleForgotPassword = () => {
    alert('Forgot Password button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername} // Update the username state
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Update the password state
        secureTextEntry={true} // Hide password input
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button title="Forgot Password?" onPress={handleForgotPassword} style={styles.button} color="gray" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%', 
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10, 
    padding: 10,
  }
});