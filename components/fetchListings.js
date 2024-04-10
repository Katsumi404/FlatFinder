import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, ScrollView } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import { db } from "../firebase.js"; 
import { collection, getDocs } from "firebase/firestore";

function FetchListings({ searchQuery, serializableUser, locationPref, amenitiesPref, availabilityPref, roomPref, pricePref }) {
    const [allDocs, setAllDocs] = useState([]);

    useEffect(() => {
        if (searchQuery.length >= 3) {
          fetchAll(searchQuery);
        }
    }, [searchQuery]);


    function fetchAll() {
        const collectionRef = collection(db, "PropertyListings");
    
        // Fetch documents
        getDocs(collectionRef)
            .then((querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (
                        data.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        (
                            locationPref === "no-location-pref" ||
                            (locationPref === "London" && data.City === "London") ||
                            (locationPref === "Leeds" && data.City === "Leeds") ||
                            (locationPref === "Netherlands" && data.City === "Netherlands")||
                            (locationPref === "Glasgow" && data.City === "Glasgow")||
                            (locationPref === "Frankfurt" && data.City === "Frankfurt")
                        ) &&
                        (
                            amenitiesPref === "no-amenities-pref" ||
                            (amenitiesPref === "amenities" && (data.Amenities != "" || data.Amenities === ""))
                        ) &&
                        (
                            availabilityPref === "no-available-pref" ||
                            (
                                (availabilityPref === "available" && data.Availability === "Available") ||
                                (availabilityPref === "not-available" && data.Availability === "Sold")
                            )
                        ) &&
                        (
                            pricePref === "no-price-pref" ||
                            (
                                (pricePref === "more-than-price" && data.Price >= 1500) ||
                                (pricePref === "less-than-price" && data.Price <= 1500)
                            )
                        ) &&
                        (
                            roomPref === "no-room-pref" ||
                            (roomPref === "one-room" && data.Rooms === "Studio flat" ||data.Rooms === "Studio" ||data.Rooms === 1) ||
                            (roomPref === "two-rooms" && data.Rooms === 2) ||
                            (roomPref === "three-rooms" && data.Rooms === 3) ||
                            (roomPref === "four-rooms" && data.Rooms === 4)
                        )
                    ) {
                        documents.push({ id: doc.id, ...data });
                    }
                });
                setAllDocs(documents);
                console.log("Documents fetched:", documents);
            })
            .catch((error) => {
                console.error("Error fetching documents: ", error);
            });
    }
    
    function clear() {
        setAllDocs([]);
    }

    function saveListing() {
        alert('Saved listing.');
    }

    return (
        <View>
        <ScrollView>
            {/* Display fetched documents */}
            {allDocs.map((doc) => (
                <View key={doc.id} style={SearchStyle.listItem}>
                    <View style={SearchStyle.titleContainer}>
                        <Text style={SearchStyle.listItemTitle}>{doc.Title}</Text>
                    </View>
                    <View style={SearchStyle.contentContainer}>
                        <View style={SearchStyle.imageContainer}>
                            <Image source={{ uri: doc.Image }} style={SearchStyle.image} />
                        </View>
                        <View style={SearchStyle.textContainer}>
                            <Text style={SearchStyle.listItemText}>Price: £{doc.Price}</Text>
                            <Text style={SearchStyle.listItemText}>Address: {doc.Address}</Text>
                            <Text style={SearchStyle.listItemText}>Availability: {doc.Availability}</Text>
                            <Text style={SearchStyle.listItemText}>Rooms: {doc.Rooms}</Text>
                            <Button 
                                title="Save listing" 
                                onPress={saveListing} 
                                style={AppStyle.button} 
                                color='green' 
                            /> 
                        </View>
                    </View>
                </View>
            ))}
            <Button 
                title="Clear Listings" 
                onPress={clear} 
                color='green' 
            />
    </ScrollView>
    </View>
    );
}

export default FetchListings;
