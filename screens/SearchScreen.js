import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Fetch from '../components/fetch';

export default function SearchScreen(){


  const searched = () => {

    if (Search !== ""){
      alert('You have searched for ' + Search);
    }
    else{
      alert('Please enter in a search')
    }
  };

  const [Search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [pricePref, setPricePref] = useState("no-price-pref");
  const [roomPref, setRoomPref] = useState("no-room-pref");
  const [sizePref, setSizePref] = useState("no-size-pref");
  const [petPref, setPetPref] = useState("no-pet-pref");
  const [availabilityPref, setAvailabilityPref] = useState("available");


  return (

    <View style={styles.container}>

      <Fetch/>
      
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
  input: {
    width: '80%', 
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center'
  },
  picker:{
    textAlign:'center'
  },
  label:{
    fontWeight:'bold'
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
   
  }
});
