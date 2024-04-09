import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, FlatList, ImageBackground } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';
import { db } from "../firebase.js"; 
import { collection, query, where, doc, getDocs, updateDoc } from "firebase/firestore";

export default function ProfileScreen({ navigation, route }) {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');

    const { serializableUser } = route.params;
    const queryRef = query(collection(db, "UserData"), where("Email", "==", serializableUser.email));

    getDocs(queryRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            // Access individual fields from userData object
            setUid(doc.id);
            setEmail(userData.Email);
            const date = new Date(userData.DoB);
            const formattedDate = date.toLocaleDateString();
            setDateOfBirth(formattedDate);
            setFirstName(userData.FirstName);
            setLastName(userData.LastName);
            setGender(userData.Gender);
            // Access more fields as needed
            
            console.log("Document ID:", doc.id);
            console.log("Email:", email);
            // Log more fields as needed
        });
    })
    .catch((error) => {
        console.error("Error getting documents:", error);
    });

    const toMain = () => {
        navigation.pop();
    };

    const logout = () => {
        signOut(auth).then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        });
    };

    const renderHeader = () => {
        return (
            <View style={MainStyle.header}>
              <View style={MainStyle.headerTitle}>
                <Text style={MainStyle.headerText}>Welcome</Text>
                <Text style={MainStyle.headerSubText}>{firstName} {lastName}</Text>

              </View>
              <TouchableOpacity style={MainStyle.logoutContainer} onPress={toMain}>
                <Image style={MainStyle.logoImage} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10196/10196993.png' }} />
                <Text style={MainStyle.logoutText}>Home</Text>
              </TouchableOpacity>
            </View>
          );
      };
    
    const renderFooter = () => {
        return (
          <View style={MainStyle.footer}>
            <TouchableOpacity style={MainStyle.logoutContainer} onPress={logout}>
                <Image style={MainStyle.logoImage} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png' }} />
                <Text style={MainStyle.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );
    };

    return ( 
        <ImageBackground source={backgroundImage} style={MainStyle.backgroundImage}>
          <View style={MainStyle.overlay}>
            {renderHeader()}
            {renderFooter()}
          </View>
        </ImageBackground>
    );
}