import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Switch, ScrollView, Button } from 'react-native';
import backgroundImage from '../assets/background.jpg';
import AppStyle from '../styles/AppStyle.js';
import MainStyle from '../styles/MainStyle.js';
import LoginStyle from '../styles/LoginStyle.js';
import { db } from "../firebase.js"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import UpdateUser from '../components/updateUser.js';

export default function ExtraProfileScreen({ navigation, route }) {
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [smoking, setSmoking] = useState(false);
    const [pets, setPets] = useState(false);
    const [riseTime, setRiseTime] = useState('');
    const [sleepTime, setSleepTime] = useState('');
    const [personalityType, setPersonalityType] = useState('');

    const { profileData } = route.params;
    const queryRef = query(collection(db, "UserData"), where("docUid", "==", profileData.docUid));

    getDocs(queryRef)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                // Access more fields as needed
                // Attempt to access matchmaking features
                // May not have been updated yet
                if ('DietaryRestrictions' in userData) setDietaryRestrictions(userData.DietaryRestrictions);
                if ('Smoking' in userData) setSmoking(userData.Smoking);
                if ('Pets' in userData) setPets(userData.Pets);
                if ('RiseTime' in userData) setRiseTime(userData.RiseTime);
                if ('SleepTime' in userData) setSleepTime(userData.SleepTime);
                if ('PersonalityType' in userData) setPersonalityType(userData.PersonalityType);
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

    const updateProfile = () => {
        const data = {
            DietaryRestrictions: dietaryRestrictions !== '' ? dietaryRestrictions : undefined,
            Smoking: smoking !== '' ? smoking : undefined,
            Pets: pets !== '' ? pets : undefined,
            RiseTime: riseTime ? riseTime : undefined,
            SleepTime: sleepTime ? sleepTime : undefined,
            PersonalityType: personalityType !== '' ? personalityType : undefined,
        };
        UpdateUser(profileData.docUid, data);
    }

    const renderHeader = () => {
        return (
            <View style={MainStyle.header}>
              <View style={MainStyle.headerTitle}>
                <Text style={MainStyle.headerText}>More profile</Text>
                <Text style={MainStyle.headerSubText}>features</Text>
              </View>
            </View>
          );
      };
    
    const renderFooter = () => {
        return (
          <View style={MainStyle.footer}>
            <TouchableOpacity style={MainStyle.logoutContainer} onPress={toMain}>
                <Image style={MainStyle.logoImage} source={{ uri: 'https://static-00.iconduck.com/assets.00/return-icon-2048x1866-c8h3yn0w.png' }} />
                <Text style={MainStyle.logoutText}>Back to</Text>
                <Text style={MainStyle.logoutText}>basic profile</Text>
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
                        placeholder="Dietary restrictions" 
                        value={dietaryRestrictions} 
                        onChangeText={setDietaryRestrictions} 
                        style={LoginStyle.input}   
                    />
                    <View style={LoginStyle.row}>
                        <Text>Do you smoke?</Text>
                        <Switch
                        value={smoking}
                        onValueChange={(newValue) => setSmoking(newValue)}
                        />
                    </View>
                    <View style={LoginStyle.row}>
                        <Text>Do you have pets?</Text>
                        <Switch
                        value={pets}
                        onValueChange={(newValue) => setPets(newValue)}
                        />
                    </View>
                    <TextInput
                        placeholder="Normal wake up time"
                        value={riseTime}
                        onChangeText={setRiseTime} 
                        style={LoginStyle.input}   
                    />
                    <TextInput 
                        placeholder="Normal bedtime" 
                        value={sleepTime} 
                        onChangeText={setSleepTime} 
                        style={LoginStyle.input}
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