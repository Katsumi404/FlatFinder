import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { db } from "../firebase.js"; 
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import MainStyle from '../styles/MainStyle.js';
import SearchStyle from '../styles/SearchStyle.js'; // Ensure this is imported
import backgroundImage from '../assets/background.jpg';

function FetchListings({ route, navigation }) {
    const [savedListings, setSavedListings] = useState([]);
    const { serializableUser } = route.params;
    const userId = serializableUser.uid;

    useEffect(() => {
        fetchSavedListings();
    }, []);

    async function fetchSavedListings() {
        const savedCollectionRef = collection(db, "SavedListings");
        const q = query(savedCollectionRef, where("userId", "==", userId));

        try {
            const querySnapshot = await getDocs(q);
            const propertyListingIds = querySnapshot.docs.map(doc => doc.data().listingId);
            const propertyListingsPromises = propertyListingIds.map(listingId =>
                getDoc(doc(db, "PropertyListings", listingId))
            );
            const propertyListingsSnapshots = await Promise.all(propertyListingsPromises);
            const listings = propertyListingsSnapshots.filter(snapshot => snapshot.exists()).map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data(),
            }));
            setSavedListings(listings);
        } catch (error) {
            console.error("Error fetching saved listings: ", error);
        }
    }

    const renderHeader = () => {
      return (
        <View style={MainStyle.header}>
          <View style={MainStyle.headerTitle}>
            <Text style={MainStyle.headerText}>View Saved Listings</Text>
          </View>
        </View>
      );
    };

    const renderFooter = () => {
        return (
            <View style={MainStyle.footer}>
                <TouchableOpacity style={MainStyle.logoutContainer} onPress={() => navigation.pop()}>
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
                <ScrollView>
                    {savedListings.map((listing) => (
                        <View key={listing.id} style={SearchStyle.listItem}>
                            <Image source={{ uri: listing.Image }} style={SearchStyle.image} />
                            <View style={SearchStyle.textContainer}>
                                <Text style={SearchStyle.listItemTitle}>{listing.Title || "No Title Available"}</Text>
                                <Text style={SearchStyle.listItemText}>Amenities: {listing.Amenities}</Text>
                                <Text style={SearchStyle.listItemText}>Availability: {listing.Availability}</Text>
                                <Text style={SearchStyle.listItemText}>City: {listing.City}</Text>
                                {/* More details as needed */}
                            </View>
                        </View>
                    ))}
                </ScrollView>
                {renderFooter()}
            </View>
        </ImageBackground>
    );
}
export default FetchListings;