import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [smokingPreference, setSmokingPreference] = useState('');
  const [petPreference, setPetPreference] = useState('');

  const handleRegistration = () => {
    alert('Registration submitted');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <Text style={styles.header}>Personal Details</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      
      <Text style={styles.header}>Set Password</Text>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />
      <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true} />
      
      <Text style={styles.header}>Profile</Text>
      <TextInput placeholder="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} style={styles.input} />
      <TextInput placeholder="Dietary Restrictions/Preferences" value={dietaryRestrictions} onChangeText={setDietaryRestrictions} style={styles.input} />
      <TextInput placeholder="Smoking or Non-smoking" value={smokingPreference} onChangeText={setSmokingPreference} style={styles.input} />
      <TextInput placeholder="Pets or No Pets" value={petPreference} onChangeText={setPetPreference} style={styles.input} />
      
      <Button title="Register" onPress={handleRegistration} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
  },
});

import React, { useState } from 'react';
import { TextInput, Button, ImageBackground, Text, ScrollView } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleRegistration = () => {
    if (password===confirmPassword && password!=="") {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigation.navigate('Main', {user: userCredential.user});
      })
      .catch((error) => {
        setValidationMessage(error.message);
      });
    }
    alert('Registration submitted');
  };

  const toLogin = () => {
    navigation.popToTop();
  }

  const  validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }
    setValue(value)
  }

  return (
    <ImageBackground source={localImage} style={AppStyle.container}>
      <Text style={LoginStyle.title}>Register</Text>
      <Text style={{ color: 'white' }}>{validationMessage}</Text>
        
      <Text style={LoginStyle.header}>Personal Details</Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={LoginStyle.input}   
      />
      <TextInput 
        placeholder="Phone Number" 
        value={phoneNumber} 
        onChangeText={setPhoneNumber} 
        style={LoginStyle.input} 
        keyboardType="phone-pad" 
      />
      <TextInput 
        placeholder="First Name" 
        value={firstName} 
        onChangeText={setFirstName} 
        style={LoginStyle.input}   
      />
      <TextInput 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
        style={LoginStyle.input}
      />
      <TextInput 
        placeholder="Date of Birth" 
        value={dateOfBirth} 
        onChangeText={setDateOfBirth} 
        style={LoginStyle.input} 
      />
        
      <Text style={LoginStyle.header}>Set Password</Text>
      
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} 
        style={LoginStyle.input} 
        secureTextEntry={true} 
      />
      <TextInput 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} 
        style={LoginStyle.input} 
        secureTextEntry={true} 
      />

      <Button 
        title="Register" 
        onPress={handleRegistration} 
        style={LoginStyle.button}
        color='green'  
      />
      <Text style={{ color: '#77DD77' }}>Already have an account? <InlineTextButton text="Login" onPress={toLogin}/></Text>
    </ImageBackground>
  );
}