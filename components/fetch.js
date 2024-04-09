import React, { useState, useEffect } from "react";
import { Button, View, Text, Image } from 'react-native';
import AppStyle from '../styles/AppStyle.js';
import SearchStyle from '../styles/SearchStyle.js';
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

function Fetch({ searchQuery }) 
    {const [allDocs, setAllDocs] = useState([]);

  useEffect(() => {
    if (searchQuery !== "") {
      fetchAll(searchQuery);
    }
  }, [searchQuery]);

  function fetchAll(query) {
    const collectionRef = collection(db, "PropertyListings");
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          // Filter documents based on search query
           if (doc.data().Title.toLowerCase().includes(query.toLowerCase())) {
                    documents.push({ id: doc.id, ...doc.data() });
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
 
  return (
    <View>
      <Button 
        title="Clear Listings" 
        onPress={clear} 
        color='green' 
      />

      {/* Display fetched documents */}
      {allDocs.map((doc) => (
        <View key={doc.id} style={SearchStyle.listItem}>
                <Text>(Firestore) Document ID: {doc.id}</Text>
                <Text style={SearchStyle.listItemText}>Name: {doc.Title}{'\n'}</Text>
                <Text style={SearchStyle.listItemText}>Price: £{doc.Price}{'\n'}</Text>
                <Text style={SearchStyle.listItemText}>Image:{'\n'}</Text>
                <Image source={doc.Image} style={SearchStyle.listItem} />
        </View>
      ))}</View>
    );
}

export default Fetch;
