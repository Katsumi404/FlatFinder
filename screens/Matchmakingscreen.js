import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, ScrollView } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import MatchmakingStyle from '../styles/MatchmakingStyle.js'; // You'll need to create this style file

export default function MatchmakingScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [matchList, setMatchList] = useState([]);

  // Function to handle matchmaking logic
  const handleMatchmaking = () => {
    // Here you would implement the logic to fetch matching flats based on user preferences
    // For this example, let's just set a static list of matching flats
    const matchingFlats = [
      { id: 1, location: 'Downtown', rent: '$1000', rooms: '2' },
      { id: 2, location: 'Suburb', rent: '$800', rooms: '1' },
      // Add more matching flats as needed
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

