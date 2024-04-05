import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, ScrollView } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import MatchmakingStyle from '../styles/MatchmakingStyle.js';

export default function MatchmakingScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [matchList, setMatchList] = useState([]);

  // Function to handle matchmaking logic
  const handleMatchmaking = () => {
    const matchingFlats = flats.filter(flat => {
    // Check if the location matches
    if (location && flat.location.toLowerCase() !== location.toLowerCase()) {
      return false;
    }
    // Check if the rent is within the budget
    if (budget && flat.rent > parseInt(budget)) {
      return false;
    }
    // Check if the number of rooms matches
    if (numRooms && flat.rooms !== parseInt(numRooms)) {
      return false;
    }
    return true;
  });
  setMatchList(matchingFlats);
};

    ];
    setMatchList(matchingFlats);
  };

  // Function to navigate to flat details screen
  const viewFlatDetails = (flatId) => {
    // Navigate to flat details screen passing flatId
    navigation.navigate('FlatDetails', { flatId });
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={AppStyle.container}>
      <ScrollView contentContainerStyle={AppStyle.scrollContainer}>
        <Text style={MatchmakingStyle.title}>Find Your Perfect Flat</Text>
        <Location
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={MatchmakingStyle.input}
        />
        <Budget 
          placeholder="Budget"
          value={budget}
          onChangeText={setBudget}
          style={MatchmakingStyle.input}
          keyboardType="numeric"
        />
        <Rooms
          placeholder="Number of Rooms"
          value={numRooms}
          onChangeText={setNumRooms}
          style={MatchmakingStyle.input}
          keyboardType="numeric"
        />
        <Search
          title="Search"
          onPress={handleMatchmaking}
          style={AppStyle.button}
          color="green"
        />
        {matchList.length > 0 && (
          <View style={MatchmakingStyle.matchListContainer}>
            <Text style={MatchmakingStyle.matchListTitle}>Matching Flats:</Text>
            {matchList.map((flat) => (
              <View key={flat.id} style={MatchmakingStyle.flatItem}>
                <Text>{`Location: ${flat.location}, Rent: ${flat.rent}, Rooms: ${flat.rooms}`}</Text>
                <Button
                  title="View Details"
                  onPress={() => viewFlatDetails(flat.id)}
                  color="#77DD77"
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

