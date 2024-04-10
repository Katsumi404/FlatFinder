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
    let dateOfBirth = new Date();
    const [gender, setGender] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [smoking, setSmoking] = useState(false);
    const [pets, setPets] = useState(false);
    const [riseTime, setRiseTime] = useState('');
    const [sleepTime, setSleepTime] = useState('');
    const [personalityType, setPersonalityType] = useState('');

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
            dateOfBirth = formattedDate;
            setFirstName(userData.FirstName);
            setLastName(userData.LastName);
            setGender(userData.Gender);
            
            // Access more fields as neededAttempt to access matchmaking features
            // May not have been updates yet
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
            <Button 
                title="Save changes" 
                onPress={updateProfile} 
                style={AppStyle.button}
                color='green'  
            />
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
                </View>
            </ScrollView>
            {renderFooter()}
          </View>
        </ImageBackground>
    );
}