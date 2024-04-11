import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';
import { db } from "../firebase.js"; 
import { collection, getDocs } from "firebase/firestore";

const locations = [
  "London", "Leeds", "Glasgow", "Frankfurt", "Brighton", "Dublin",
  "Luxembourg", "Netherlands", "Limerick", "Switzerland", "Kraków",
  "Shanghai", "Hong Kong", "Singapore", "Sydney", "Melbourne", "Auckland",
  "South Africa", "Austin", "Charlotte", "New York", "St Petersburg",
  "Toronto", "Montreal"
];

const UtilitiesScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [utilities, setUtilities] = useState([]);

  // Define fetchUtilities outside the useEffect hook
  // Define fetchUtilities outside the useEffect hook
  const fetchUtilities = async () => {
    const utilitiesCollectionRef = collection(db, "Utilities");
    try {
      const querySnapshot = await getDocs(utilitiesCollectionRef);
      const newUtilities = [];
      querySnapshot.forEach(doc => {
        const utilityData = { id: doc.id, ...doc.data() };
        newUtilities.push(utilityData);
      });
      console.log(newUtilities);
      setUtilities(newUtilities);
    } catch (error) {
      console.error("Error fetching utilities:", error);
    }
  };

  useEffect(() => {
    // Call fetchUtilities inside the useEffect hook
    fetchUtilities();
  }, []);

  useEffect(() => {
    // Log the updated utilities state
    console.log(utilities);
  }, [utilities]);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    fetchUtilities(); // Fetch utilities again after location change
  };

  const filteredUtilities = utilities.filter(utility => utility.Name === selectedLocation);

  return (
    <ImageBackground source={backgroundImage} style={MainStyle.backgroundImage}>
      <View style={MainStyle.overlay}>
        <View style={MainStyle.header}>
          <View style={MainStyle.headerTitle}>
            <Text style={MainStyle.headerText}>Utility Bills</Text>
          </View>
        </View>
        
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
          <Text>Select a location:</Text>
            <Picker
              selectedValue={selectedLocation}
              onValueChange={(itemValue) => handleLocationChange(itemValue)}
              >
              <Picker.Item label="-- Select a location --" value="" />
              {locations.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
            {selectedLocation ? (
              <Text>You selected: {selectedLocation}</Text>
            ) : null}
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
          {filteredUtilities.map((utility, index) => (
            <View key={index}>
              <Text>Council Tax: {utility.councilTax}</Text>
              <Text>Electricity Bill: {utility.electricityBill}</Text>
              <Text>Water Bill: {utility.waterBill}</Text>
            </View>
          ))}
        </View>

        <View style={MainStyle.footer}>
          <TouchableOpacity style={MainStyle.logoutContainer} onPress={() => navigation.pop()}>
            <Text style={MainStyle.logoutText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UtilitiesScreen;