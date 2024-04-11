import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, TextInput, Button, Text, Modal } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import { Picker } from '@react-native-picker/picker';
import MainStyle from '../styles/MainStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import FetchListings from '../components/fetchListings.js';

export default function SearchScreen({ navigation, route }){
  const { serializableUser } = route.params;
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
            <View style={SearchStyle.centredView}>
              <View style={SearchStyle.modalView}>
              <Text style={SearchStyle.label}>Price</Text>
              <View style={SearchStyle.buttonGroup}>
                <TouchableOpacity
                  style={pricePref === "no-price-pref" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setPricePref("no-price-pref")}
                >
                  <Text style={SearchStyle.buttonText}>No Price Preference</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={pricePref === "more-than-price" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setPricePref("more-than-price")}
                >
                  <Text style={SearchStyle.buttonText}>More than 1500</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={pricePref === "less-than-price" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setPricePref("less-than-price")}
                >
                  <Text style={SearchStyle.buttonText}>Less than 1500</Text>
                </TouchableOpacity>
              </View>

              <Text style={SearchStyle.label}>Location</Text>
              <View style={SearchStyle.buttonGroup}>
                <TouchableOpacity
                  style={locationPref === "no-location-pref" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("no-location-pref")}
                >
                  <Text style={SearchStyle.buttonText}>No Preference</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={locationPref === "London" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("London")}
                >
                  <Text style={SearchStyle.buttonText}>London</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={locationPref === "Leeds" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("Leeds")}
                >
                  <Text style={SearchStyle.buttonText}>Leeds</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={locationPref === "Netherlands" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("Netherlands")}
                >
                  <Text style={SearchStyle.buttonText}>Netherlands</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={locationPref === "Glasgow" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("Glasgow")}
                >
                  <Text style={SearchStyle.buttonText}>Glasgow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={locationPref === "Frankfurt" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setLocationPref("Frankfurt")}
                >
                  <Text style={SearchStyle.buttonText}>Frankfurt</Text>
                </TouchableOpacity>
              </View>

                
              <Text style={SearchStyle.label}>Number of Rooms</Text>
              <View style={SearchStyle.buttonGroup}>
                <TouchableOpacity
                  style={roomPref === "no-room-pref" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setRoomPref("no-room-pref")}
                >
                  <Text style={SearchStyle.buttonText}>No Preference</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={roomPref === "one-room" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setRoomPref("one-room")}
                >
                  <Text style={SearchStyle.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={roomPref === "two-rooms" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setRoomPref("two-rooms")}
                >
                  <Text style={SearchStyle.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={roomPref === "three-rooms" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setRoomPref("three-rooms")}
                >
                  <Text style={SearchStyle.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={roomPref === "four-rooms" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setRoomPref("four-rooms")}
                >
                  <Text style={SearchStyle.buttonText}>4</Text>
                </TouchableOpacity>
              </View>

              <Text style={SearchStyle.label}>Extra Amenities</Text>
              <View style={SearchStyle.buttonGroup}>
                <TouchableOpacity
                  style={amenitiesPref === "no-amenities-pref" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAmenitiesPref("no-amenities-pref")}
                >
                  <Text style={SearchStyle.buttonText}>No Preference</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={amenitiesPref === "amenities" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAmenitiesPref("amenities")}
                >
                  <Text style={SearchStyle.buttonText}>Amenities Included</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={amenitiesPref === "no-amenities" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAmenitiesPref("no-amenities")}
                >
                  <Text style={SearchStyle.buttonText}>No Amenities Included</Text>
                </TouchableOpacity>
              </View>
                                
              <Text style={SearchStyle.label}>Availability</Text>
              <View style={SearchStyle.buttonGroup}>
                <TouchableOpacity
                  style={availabilityPref === "no-available-pref" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAvailabilityPref("no-available-pref")}
                >
                  <Text style={SearchStyle.buttonText}>No Preference</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={availabilityPref === "available" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAvailabilityPref("available")}
                >
                  <Text style={SearchStyle.buttonText}>Available</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={availabilityPref === "sold" ? SearchStyle.selectedButton : SearchStyle.button}
                  onPress={() => setAvailabilityPref("sold")}
                >
                  <Text style={SearchStyle.buttonText}>Sold</Text>
                </TouchableOpacity>
              </View>

                <Button 
                  title="Close" 
                  onPress={() => setFilter(!filter)} 
                  color='green'
                />
              </View>
            </View>
          </Modal>

          <FetchListings 
            searchQuery={Search} 
            serializableUser={serializableUser} 
            locationPref={locationPref} 
            amenitiesPref={amenitiesPref} 
            availabilityPref={availabilityPref} 
            roomPref={roomPref}
            pricePref={pricePref}
          />
        </View>
        {renderFooter()}
      </View>
    </ImageBackground>
  ); 
}