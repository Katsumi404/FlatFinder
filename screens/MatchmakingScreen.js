import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, ScrollView } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import MatchmakingStyle from '../styles/MatchmakingStyle.js';
import { fetchMatchingFlats } from '../api'; // Assuming you have an API function to fetch matching flats

export default function MatchmakingScreen({ navigation }) {
  const [pets, setPets] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [social, setSocial] = useState(false);
  const [organized, setOrganized] = useState(false);
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    fetchMatchingFlats({ pets, smoking, social, organized })
      .then(data => setMatchList(data))
      .catch(error => console.error('Error fetching matching flats:', error));
  }, [pets, smoking, social, organized]);

  // Function to navigate to flat details screen
  const viewFlatDetails = (flatId) => {
    // Navigate to flat details screen passing flatId
    navigation.navigate('FlatDetails', { flatId });
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={AppStyle.container}>
      <ScrollView contentContainerStyle={AppStyle.scrollContainer}>
        <Text style={MatchmakingStyle.title}>Find Your Perfect Flat</Text>
        <View style={MatchmakingStyle.checkboxContainer}>
          <View style={MatchmakingStyle.checkboxItem}>
            <Text>Pets</Text>
            <Button
              title={pets ? 'Yes' : 'No'}
              onPress={() => setPets(!pets)}
              color={pets ? 'green' : 'red'}
            />
          </View>
          <View style={MatchmakingStyle.checkboxItem}>
            <Text>Smoking</Text>
            <Button
              title={smoking ? 'Yes' : 'No'}
              onPress={() => setSmoking(!smoking)}
              color={smoking ? 'green' : 'red'}
            />
          </View>
          <View style={MatchmakingStyle.checkboxItem}>
            <Text>Social</Text>
            <Button
              title={social ? 'Yes' : 'No'}
              onPress={() => setSocial(!social)}
              color={social ? 'green' : 'red'}
            />
          </View>
          <View style={MatchmakingStyle.checkboxItem}>
            <Text>Organized</Text>
            <Button
              title={organized ? 'Yes' : 'No'}
              onPress={() => setOrganized(!organized)}
              color={organized ? 'green' : 'red'}
            />
          </View>
        </View>
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
