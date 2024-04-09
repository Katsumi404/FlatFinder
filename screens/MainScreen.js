import React from 'react';
import { Text, View, TouchableOpacity, Image, Alert, FlatList, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';
import { auth } from "../firebase";

export default function MainScreen({ navigation }) {
  const user = auth.currentUser;
  const serializableUser = {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  };

  const toSearch = () => {
    navigation.navigate('Search', { serializableUser: serializableUser });
  };

  const toMatchmaking = () => {
    navigation.navigate('Matchmaking', { serializableUser: serializableUser });
  };

  const toUtilities = () => {
    navigation.navigate('Utilities', { serializableUser: serializableUser });
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    });
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile', { serializableUser: serializableUser });
  };

  // Define options data
  const options = [
    { id: 1, title: 'Search', image: 'https://cdn-icons-png.freepik.com/512/9135/9135995.png' },
    { id: 2, title: 'Saved Listings', image: 'https://img.icons8.com/color/70/000000/filled-like.png' },
    { id: 3, title: 'Utility Costs', image: 'https://cdn-icons-png.freepik.com/512/5656/5656521.png' },
    { id: 4, title: 'Matchmaking', image: 'https://cdn-icons-png.flaticon.com/512/284/284154.png' },
  ];

  const renderHeader = () => {
    return (
      <View style={MainStyle.header}>
        <View style={MainStyle.headerTitle}>
          <Text style={MainStyle.headerText}>Welcome to your</Text>
          <Text style={MainStyle.headerSubText}>Flatfinder!</Text>
        </View>
        <TouchableOpacity style={MainStyle.profileIcon} onPress={handleViewProfile}>
          <Image style={MainStyle.profileImage} source={{ uri: 'https://img.icons8.com/ios/50/000000/user-male-circle.png' }} />
          <Text style={MainStyle.profileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={MainStyle.footer}>
        <TouchableOpacity style={MainStyle.logoutContainer} onPress={logout}>
          <Image style={MainStyle.logoImage} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png' }} />
          <Text style={MainStyle.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={MainStyle.backgroundImage}>
      <View style={MainStyle.overlay}></View>
      {renderHeader()}
      <View style={MainStyle.contentContainer}>
        <FlatList
          style={MainStyle.list}
          contentContainerStyle={MainStyle.listContainer}
          data={options}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={MainStyle.card}
                onPress={() => {
                  if (item.title === 'Search') {
                    toSearch();
                  } else if (item.title === 'Saved Listings') {
                    // Implement logic to navigate to saved listings screen
                  } else if (item.title === 'Utility Costs') {
                    toUtilities();
                  } else if (item.title === 'Matchmaking') {
                    toMatchmaking();
                  }
                }}>
                <View style={MainStyle.cardFooter}></View>
                <Image style={MainStyle.cardImage} source={{ uri: item.image }} />
                <View style={MainStyle.cardHeader}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={MainStyle.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {renderFooter()}
      </View>
    </ImageBackground>
  );
}
