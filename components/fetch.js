import React, { useState } from "react";
import { Button, View, Text, Image } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

function Fetch() {
    const [allDocs, setAllDocs] = useState([]);

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

    return (
        <View style={AppStyle.container}> 
        <Text style={AppStyle.title}>Flat Search Page</Text>
            <Button 
                title="View all listings" 
                onPress={fetchAll} 
                style={AppStyle.button} 
                color='green' 
            /> 

            {/* Display fetched documents */}
            {allDocs.map((doc) => (
            <Text key={doc.id} style={SearchStyle.listItem}>  {/* Assuming 'listItem' is defined in SearchStyles */}
                (Firestore)Document ID: {doc.id}
                <Text style={SearchStyle.listItemText}>Name: {doc.Title}{'\n'}</Text>
                <Text style={SearchStyle.listItemText}>Price: £{doc.Price}{'\n'}</Text>
                <Text style={SearchStyle.listItemText}>Image:{'\n'}</Text>
                <Image source={doc.Image} style={SearchStyle.listItem} />
            </Text>
            ))}
        </View>
    );
}

export default Fetch;
