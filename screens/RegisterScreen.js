import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [smokingPreference, setSmokingPreference] = useState('');
  const [petPreference, setPetPreference] = useState('');

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
      <TextInput placeholder="Date of Birth" value={formatDate(dateOfBirth)} onChangeText={setDateOfBirth} style={styles.input} />
      <Button title="Select Date" onPress={showDatepicker}/>
      {showDatePicker && (
        <DateTimePicker value={dateOfBirth} mode="date" display="default" onChange={handleDateChange} />
      )}
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
