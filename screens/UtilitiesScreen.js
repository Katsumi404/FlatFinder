import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';

const UtilitiesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ImageBackground source={backgroundImage} style={MainStyle.backgroundImage}>
      <View style={MainStyle.overlay}>
        {/* Header */}
        <View style={MainStyle.header}>
          <View style={MainStyle.headerTitle}>
            <Text style={MainStyle.headerText}>Utility Bills</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search..."
          />
        </View>

        {/* Placeholder for search results or other content */}
        {/* <View>...content...</View> */}

        {/* Footer */}
        <View style={MainStyle.footer}>
          <TouchableOpacity style={MainStyle.logoutContainer} onPress={() => navigation.pop()}>
            <Text style={MainStyle.logoutText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// Additional styles for the search bar
const styles = StyleSheet.create({
  searchContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  searchInput: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 16,
  },
});

export default UtilitiesScreen;
