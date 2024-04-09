import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, ScrollView } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import { db } from "../firebase.js"; 
import { collection, getDocs } from "firebase/firestore";

function FetchListings({ searchQuery, serializableUser }) {
    const [allDocs, setAllDocs] = useState([]);

    useEffect(() => {
        if (searchQuery !== "") {
          fetchAll(searchQuery);
        }
    }, [searchQuery]);
    

    function fetchAll() {
        // Reference to the collection you want to fetch documents from
        const collectionRef = collection(db, "PropertyListings");
  
        // Fetch documents
        getDocs(collectionRef)
            .then((querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
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
