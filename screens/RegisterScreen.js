import React, { useState } from 'react';
import { TextInput, Button, ImageBackground, Text, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Function to handle date change
  const handleDateChange = (event, newDate) => {
    if (event.type === 'set' && newDate !== undefined) {
      setDateOfBirth(newDate); // Convert Date object to ISO string
    }
    setShowDatePicker(false); // Close the DateTimePicker regardless of selection
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  function formatDate(date) {// Get day, month, and year components from the date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Format the date as "dd-mm-yyyy"
    return `${day}-${month}-${year}`;
  }

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
        value={formatDate(dateOfBirth)}
        onChangeText={setDateOfBirth} // Disable this handler (optional)
        style={[LoginStyle.dateInput]}
        editable={false} // This prevents editing
      />
      <Button 
        title="Select Date" 
        onPress={showDatepicker}
        style={AppStyle.button}
        color='green'
      />
      {showDatePicker && (
        <DateTimePicker value={dateOfBirth} mode="date" display="default" onChange={handleDateChange} />
      )}
        
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
        style={AppStyle.button}
        color='green'  
      />
      <Text style={{ color: '#77DD77' }}>Already have an account? <InlineTextButton text="Login" onPress={toLogin}/></Text>
    </ImageBackground>
  );
}