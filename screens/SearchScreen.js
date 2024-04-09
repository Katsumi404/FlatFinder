import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppStyle from '../styles/AppStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import Fetch from '../components/fetch';

export default function SearchScreen(){


  const searched = () => {

    if (Search !== ""){
      fetchAll(Search);
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
    <View style={SearchStyle.StyleSheet}>
      <StatusBar style="auto"/>
      <Text style={SearchStyle.title}>Flat Search Page</Text>
      <TextInput
        style={SearchStyle.input}
        placeholder="Search for flat"
        placeholderTextColor="#999"
        clearButtonMode='always'
        value={Search}
        onChangeText={setSearch}
        maxLength={30}
        
      />
      <Button title="Filter" onPress={() => setFilter(true)} style={SearchStyle.button}/> 
      <Button title='Save Search'/>

      <Modal
        animationType="none"
        transparent={true}
        visible={filter}
        onRequestClose={() => {
          setFilter(!filter);
        }}
      >
        <View style={SearchStyle.centeredView}>
          <View style={SearchStyle.modalView}>
            <Text style={SearchStyle.label}>Price</Text>
            <Picker
              style={SearchStyle.picker}
              selectedValue={pricePref}
              onValueChange={(itemValue, itemIndex) =>
                setPricePref(itemValue)
              }>
              <Picker.Item label="Per Month" value="per-month"/>
              <Picker.Item label="Per Week" value="per-week"/>
            </Picker>

            <Text style={SearchStyle.label}>Number of Rooms</Text>  
            <Picker
              style={SearchStyle.picker}
              selectedValue={roomPref}
              onValueChange={(itemValue, itemIndex) =>
                setRoomPref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-room-pref"/>
              <Picker.Item label="1" value="one-room"/>
              <Picker.Item label="2" value="two-rooms"/>
              <Picker.Item label="3" value="three-rooms"/>
            </Picker>
            
            <Text style={SearchStyle.label}>Size</Text>
            <Picker
              style={SearchStyle.picker}
              selectedValue={sizePref}
              onValueChange={(itemValue, itemIndex) =>
                setSizePref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-size-pref"/>
              <Picker.Item label="Smallest To Largest" value="small-to-largest"/>
              <Picker.Item label="Largest to Smallest" value="largest-to-smallest"/>
            </Picker>
            
            <Text style={SearchStyle.label}>Pet Friendliness</Text>
            <Picker
              style={SearchStyle.picker}
              selectedValue={petPref}
              onValueChange={(itemValue, itemIndex) =>
                setPetPref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-pet-pref"/>
              <Picker.Item label="Yes" value="yes-pets"/>
              <Picker.Item label="No" value="no-pets"/>
            </Picker>
            
            <Text style={SearchStyle.label}>Availablity</Text>
            <Picker
              style={SearchStyle.picker}
              selectedValue={availabilityPref}
              onValueChange={(itemValue, itemIndex) =>
                setAvailabilityPref(itemValue)
              }>
              <Picker.Item label="Available" value="available"/>
              <Picker.Item label="Not Available" value="not-available"/>
            </Picker>
            <Button title="Close" onPress={() => setFilter(!filter)} />
          </View>
        </View>
      </Modal>

      <Fetch searchQuery={Search}/>
    </View>
  ); 
}