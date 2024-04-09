import React, { useState } from 'react';
import { View, Text } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import AppStyle from '../styles/AppStyle.js';
import Fetch from '../components/fetch';
import { auth, db } from "../firebase";

export default function SearchScreen({ route }){
  const user = route?.params?.user;

  if (!user) {
    // Handle the case where user is not available
    // For example, you can redirect the user to the login screen or display an error message
    return <Text>User data not available</Text>;
  }
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

  return (
    <View style={AppStyle.container} >
      <Fetch />
    </View>
  );
}