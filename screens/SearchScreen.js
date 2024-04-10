import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, TextInput, Button, Text, Modal } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import { Picker } from '@react-native-picker/picker';
import MainStyle from '../styles/MainStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import FetchListings from '../components/fetchListings.js';

export default function SearchScreen({ navigation, route }){
  const { serializableUser } = route.params;
  console.log(serializableUser)
  const [Search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  const [pricePref, setPricePref] = useState("no-price-pref");
  const [roomPref, setRoomPref] = useState("no-room-pref");
  const [locationPref, setLocationPref] = useState("no-location-pref");
  const [amenitiesPref, setAmenitiesPref] = useState("no-amenities-pref");
  const [availabilityPref, setAvailabilityPref] = useState("no-available-pref");

  const toMain = () => {
    navigation.pop();
  };

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
        <View style={SearchStyle.StyleSheet}>
        <TextInput
            style={SearchStyle.input}
            placeholder="Search for flat"
            placeholderTextColor="#999"
            clearButtonMode='always'
            value={Search}
            onChangeText={setSearch}
            maxLength={30}
          />
          <Button 
            title="Filter" 
            onPress={() => setFilter(true)} 
            style={SearchStyle.button}
            color='green'
          /> 

          <Modal
            animationType="none"
            transparent={true}
            visible={filter}
            onRequestClose={() => {
              setFilter(!filter);
            }}
          >
            <View style={SearchStyle.centeredView}>
              <View style={SearchStyle.modalView}>
                <Text style={SearchStyle.label}>Price</Text>
                <Picker
                  style={SearchStyle.picker}
                  selectedValue={pricePref}
                  onValueChange={(itemValue) =>
                    setPricePref(itemValue)
                  }>
                  <Picker.Item label="No Price Preference" value="no-price-pref"/>
                  <Picker.Item label=">1500" value="more-than-price"/>
                  <Picker.Item label="<1500" value="less-than-price"/>
                </Picker>

                <Text style={SearchStyle.label}>Location</Text>  
                <Picker
                  style={SearchStyle.picker}
                  selectedValue={locationPref}
                  onValueChange={(itemValue) =>
                    setLocationPref(itemValue)
                  }>
                  <Picker.Item label="No Preference" value="no-location-pref"/>
                  <Picker.Item label="London" value="London"/>
                  <Picker.Item label="Leeds" value="Leeds"/>
                  <Picker.Item label="Netherlands" value="Netherlands"/>
                  <Picker.Item label="Glasgow" value="Glasgow"/>
                  <Picker.Item label="Frankfurt" value="Frankfurt"/>

                </Picker>
                
                <Text style={SearchStyle.label}>Number of Rooms</Text>  
                <Picker
                  style={SearchStyle.picker}
                  selectedValue={roomPref}
                  onValueChange={(itemValue) =>
                    setRoomPref(itemValue)
                  }>
                  <Picker.Item label="No Preference" value="no-room-pref"/>
                  <Picker.Item label="1" value="one-room" />
                  <Picker.Item label="2" value="two-rooms"/>
                  <Picker.Item label="3" value="three-rooms"/>
                  <Picker.Item label="4" value="four-rooms"/>
                </Picker>

                <Text style={SearchStyle.label}>Extra Amenities</Text>
                <Picker
                  style={SearchStyle.picker}
                  selectedValue={amenitiesPref}
                  onValueChange={(itemValue) =>
                    setAmenitiesPref(itemValue)
                  }>
                  <Picker.Item label="No Preference" value="no-amenities-pref"/>
                  <Picker.Item label="Amenities Included" value="amenities"/>
                  <Picker.Item label="No Amenities Included" value="no-amenities"/>
                </Picker>
                                
                <Text style={SearchStyle.label}>Availablity</Text>
                <Picker
                  style={SearchStyle.picker}
                  selectedValue={availabilityPref}
                  onValueChange={(itemValue) =>
                    setAvailabilityPref(itemValue)
                  }>
                  <Picker.Item label="No Preference" value="no-available-pref"/>
                  <Picker.Item label="Available" value="available"/>
                  <Picker.Item label="Sold" value="sold"/>
                </Picker>
                <Button 
                  title="Close" 
                  onPress={() => setFilter(!filter)} 
                  color='green'
                />
              </View>
            </View>
          </Modal>

          <FetchListings searchQuery={Search} serializableUser={serializableUser} 
          locationPref={locationPref} 
          amenitiesPref={amenitiesPref} 
          availabilityPref={availabilityPref} 
          roomPref={roomPref}
          pricePref={pricePref}/>
        </View>
        {renderFooter()}
      </View>
    </ImageBackground>
  ); 
}