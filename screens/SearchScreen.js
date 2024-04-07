import React, { useState } from 'react';
import { View, Text } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import AppStyle from '../styles/AppStyle.js';
import Fetch from '../components/fetch';

export default function SearchScreen(){


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