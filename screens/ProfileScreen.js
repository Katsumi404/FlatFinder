import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Switch, ScrollView, Button } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import AppStyle from '../styles/AppStyle.js';
import MainStyle from '../styles/MainStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { db } from "../firebase.js"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import UpdateUser from '../components/updateUser.js';

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
        });
    })
    .catch((error) => {
        console.error("Error getting documents:", error);
    });

    const toMain = () => {
        navigation.pop();
    };

    const toExtraProfile = () => {
        const profileData = {
            firstName: firstName,
            lastName: lastName,
            userUid: serializableUser.uid,
            email: serializableUser.email,
            emailVerified: serializableUser.emailVerified,
            docUid: uid,
        }
        navigation.navigate('ExtraProfile', { profileData: profileData });
    };

    const updateProfile = () => {
        const data = {
            Email: email || undefined,
            FirstName: firstName || undefined,
            LastName: lastName || undefined,
            DateOfBirth: dateOfBirth || undefined,
            Gender: gender || undefined,
        };
        UpdateUser(uid, data);
    }

    const renderHeader = () => {
        return (
            <View style={MainStyle.header}>
              <View style={MainStyle.headerTitle}>
                <Text style={MainStyle.headerText}>Welcome</Text>
                <Text style={MainStyle.headerSubText}>{firstName} {lastName}</Text>
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
            <ScrollView style={border='15'}>
                <View>
                    <TextInput 
                        placeholder="First Name" 
                        value={firstName} 
                        onChangeText={setFirstName} 
                        style={LoginStyle.input}   
                    />
                    <TextInput 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChangeText={setLastName} 
                        style={LoginStyle.input}
                    />
                    <TextInput
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        style={[LoginStyle.dateInput]}
                        editable={false} // This prevents editing
                    />
                    <TextInput 
                        placeholder="Gender" 
                        value={gender} 
                        onChangeText={setGender} 
                        style={LoginStyle.input}
                    />
                    <Button 
                        title="More options" 
                        onPress={toExtraProfile} 
                        style={AppStyle.button}
                        color='green'  
                    />
                    <Button 
                        title="Save changes" 
                        onPress={updateProfile} 
                        style={AppStyle.button}
                        color='green'  
                    />
                </View>
            </ScrollView>
            {renderFooter()}
          </View>
        </ImageBackground>
    );
}