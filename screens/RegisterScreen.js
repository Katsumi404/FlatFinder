import React, { useState } from 'react';
import { TextInput, Button, ImageBackground, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase.js"; 
import { collection, addDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const localImage = require('../assets/background.jpg');
  
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [minDate] = useState(new Date(Date.now() - 86400000));

  
  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    if (event.type === 'set' && currentDate <= minDate) {
      Alert.alert("Error", "Please select a date that is not today.");
      return;
    }
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleRegistration = () => {
    if (!email || !gender || !firstName || !lastName || !password || !confirmPassword) {
      setValidationMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      inputData();
      sendEmailVerification(auth.currentUser);
      navigation.navigate('Main', {user: userCredential.user});
    })
    .catch((error) => {
      setValidationMessage(error.message);
    });
  };

  const inputData = () => {
    const collectionRef = collection(db, "UserData");
    const date = dateOfBirth.getTime();
    const data = {
      DoB: date,
      Email: email,
      FirstName: firstName,
      Gender: gender,
      LastName: lastName
    };
  
    addDoc(collectionRef, data).then((docRef) => {
      console.log("Document successfully written! Document ID:", docRef.id);
    }).catch((error) => {
      setValidationMessage(error.message);
    });
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
      <Text style={AppStyle.title}>Register</Text>
      <Text style={{ color: 'white' }}>{validationMessage}</Text>
        
      <Text style={LoginStyle.header}>Personal Details</Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={LoginStyle.input}   
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
        placeholder="Gender" 
        value={gender} 
        onChangeText={setGender} 
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
