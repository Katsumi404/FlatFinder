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