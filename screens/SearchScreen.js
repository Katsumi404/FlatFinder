import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, Text } from 'react-native';
import backgroundImage from '../assets/background.jpg';
//import { Picker } from '@react-native-picker/picker';
import MainStyle from '../styles/MainStyle.js';
import FetchAllListings from '../components/fetchAllListings.js';

export default function SearchScreen({ navigation, route }){
  const { serializableUser } = route.params;

  const toMain = () => {
    navigation.pop();
  };

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

  const renderHeader = () => {
    return (
      <View style={MainStyle.header}>
        <View style={MainStyle.headerTitle}>
          <Text style={MainStyle.headerText}>Flat Search Page</Text>
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
        <FetchAllListings serializableUser={serializableUser}/>
        {renderFooter()}
      </View>
    </ImageBackground>
  );
}