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

    const toMain = () => {
        navigation.pop();
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
          </View>
        );
      };
    
      const renderFooter = () => {
        return (
          <View style={MainStyle.footer}>
            <TouchableOpacity style={MainStyle.logoutContainer} onPress={toMain}>
                <Image style={MainStyle.logoImage} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10196/10196993.png' }} />
                <Text style={MainStyle.logoutText}>Home</Text>
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