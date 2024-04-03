import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Picker, Modal } from 'react-native';

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
      <StatusBar style="auto"/>
      <Text style={styles.title}>Flat Searcher</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for flat"
        placeholderTextColor="#999"
        clearButtonMode='always'
        value = {Search}
        onChangeText={setSearch}
        maxLength={30}
      />
      <Button title="Search" onPress={searched} style={styles.button} />
      <Button title="Filter" onPress={() => setFilter(true)} style={styles.button}/> 

      <Modal
        animationType="none"
        transparent={true}
        visible={filter}
        onRequestClose={() => {
          setFilter(!filter);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Price</Text>
            <Picker
              style={styles.picker}
              selectedValue={pricePref}
              onValueChange={(itemValue, itemIndex) =>
                setPricePref(itemValue)
              }>
              <Picker.Item label="Per Month" value="per-month"/>
              <Picker.Item label="Per Week" value="per-week"/>
            </Picker>

            <Text style={styles.label}>Number of Rooms</Text>  
            <Picker
              style={styles.picker}
              selectedValue={roomPref}
              onValueChange={(itemValue, itemIndex) =>
                setRoomPref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-room-pref"/>
              <Picker.Item label="1" value="one-room"/>
              <Picker.Item label="2" value="two-rooms"/>
              <Picker.Item label="3" value="three-rooms"/>
            </Picker>
            
            <Text style={styles.label}>Size</Text>
            <Picker
              style={styles.picker}
              selectedValue={sizePref}
              onValueChange={(itemValue, itemIndex) =>
                setSizePref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-size-pref"/>
              <Picker.Item label="Smallest To Largest" value="small-to-largest"/>
              <Picker.Item label="Largest to Smallest" value="largest-to-smallest"/>
            </Picker>
            
            <Text style={styles.label}>Pet Friendliness</Text>
            <Picker
              style={styles.picker}
              selectedValue={petPref}
              onValueChange={(itemValue, itemIndex) =>
                setPetPref(itemValue)
              }>
              <Picker.Item label="No Preference" value="no-pet-pref"/>
              <Picker.Item label="Yes" value="yes-pets"/>
              <Picker.Item label="No" value="no-pets"/>
            </Picker>
            
            <Text style={styles.label}>Availablity</Text>
            <Picker
              style={styles.picker}
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
