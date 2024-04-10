import React from 'react';
import { Text, View, TouchableOpacity, Image, Alert, FlatList, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';
import { db } from "../firebase";

export default function SavedListingsScreen({ navigation, route }) {
    const { serializableUser } = route.params;
    //things u can access abt user
    const uid =  serializableUser.uid;
    const email = serializableUser.email;
    const emailVerified = serializableUser.emailVerified;
    const phoneNumber = serializableUser.phoneNumber;

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

      const renderHeader = () => {
        return (
          <View style={MainStyle.header}>
            <View style={MainStyle.headerTitle}>
              <Text style={MainStyle.headerText}>Saved Listing</Text>
              <Text style={MainStyle.headerSubText}>Page!!</Text>
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
          <View style={MainStyle.overlay}>
            {renderHeader()}
            {renderFooter()}
          </View>
        </ImageBackground>
    );
}