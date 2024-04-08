import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import backgroundImage from '../assets/background.jpg';

export default function MainScreen({ navigation }) {
  const toSearch = () => {
    navigation.navigate('Search');
  };

  const toMatchmaking = () => {
    navigation.navigate('Matchmaking');
  };

  const toUtilities = () => {
    navigation.navigate('Utilities');
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
    Alert.alert('View Profile', 'Profile is viewed');
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
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Welcome to your</Text>
          <Text style={styles.headerSubText}>Flatfinder!</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon} onPress={handleViewProfile}>
          <Image style={styles.profileImage} source={{ uri: 'https://img.icons8.com/ios/50/000000/user-male-circle.png' }} />
          <Text style={styles.profileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Image style={styles.logoImage} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png' }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}></View>
      {renderHeader()}
      <View style={styles.contentContainer}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={options}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
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
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={{ uri: item.image }} />
                <View style={styles.cardHeader}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title}>{item.title}</Text>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // White with 50% opacity
  },
  header: {
    backgroundColor: '#cadbd0',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    alignItems: 'center',
    marginLeft: 90,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 35,
  },
  headerSubText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  profileIcon: {
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 35,
  },
  profileText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
    backgroundColor: '#cadbd0',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  footer: {
    backgroundColor: '#cadbd0',
    padding: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 20,
  },
});
