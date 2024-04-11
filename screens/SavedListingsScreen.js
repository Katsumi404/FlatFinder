import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { db } from "../firebase.js"; 
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import AppStyle from '../styles/AppStyle.js';
import MainStyle from '../styles/MainStyle.js';
import SearchStyle from '../styles/SearchStyle.js'; // Ensure this is imported
import backgroundImage from '../assets/background.jpg';
import DeleteListing from '../components/deleteSavedListing.js';

function FetchListings({ route, navigation }) {
    const [savedListings, setSavedListings] = useState([]);
    const { serializableUser } = route.params;
    const userId = serializableUser.uid;
    const [propertyListingIdDict, setPropertyListingIdDict] = useState(new Map()); // Use useState for the map
    const [refreshTrigger, setRefreshTrigger] = useState(false); // State variable for triggering refresh

    useEffect(() => {
        fetchSavedListings();
    }, []);

    useEffect(() => {
        fetchSavedListings();
    }, [refreshTrigger]); // Add refreshTrigger as a dependency

    async function fetchSavedListings() {
        const savedCollectionRef = collection(db, "SavedListings");
        const q = query(savedCollectionRef, where("userId", "==", userId));

        try {
            const querySnapshot = await getDocs(q);
            const propertyListingIds = querySnapshot.docs.map(doc => doc.data().listingId);

            // Create a new Map inside the function
            const updatedDict = new Map(propertyListingIdDict);

            querySnapshot.docs.forEach(doc => {
                const data = doc.data();
                const docId = doc.id;
                const listingId = data.listingId;
                updatedDict.set(listingId, docId); // Update the temporary map
            });

            setPropertyListingIdDict(updatedDict); // Apply the final update

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

    const handleDeleteListing = async (docId) => {
        try {
            await DeleteListing(docId);
            // Toggle refresh trigger to refresh the page
            setRefreshTrigger(prev => !prev);
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

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
                <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}>
                    {savedListings.map((listing) => (
                        <View key={listing.id} style={SearchStyle.listItem}>
                            <View style={SearchStyle.titleContainer}>
                                <Text style={SearchStyle.listItemTitle}>{listing.Title || "No Title Available"}</Text>
                            </View>
                            <View style={SearchStyle.contentContainer}>
                                <View style={SearchStyle.imageContainer}>
                                    <Image source={{ uri: listing.Image }} style={SearchStyle.image} />
                                </View>
                                <View style={SearchStyle.textContainer}>
                                    <Text style={SearchStyle.listItemText}>Amenities: {listing.Amenities}</Text>
                                    <Text style={SearchStyle.listItemText}>Availability: {listing.Availability}</Text>
                                    <Text style={SearchStyle.listItemText}>City: {listing.City}</Text>
                                    <Button 
                                        title="Delete saved listing" 
                                        onPress={() => {handleDeleteListing(propertyListingIdDict.get(listing.id))}}
                                        style={AppStyle.button} 
                                        color='green' 
                                    />
                                </View>
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