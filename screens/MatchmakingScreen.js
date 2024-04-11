import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput, Switch, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import UserDetails from '../components/fetchUserData.js'; // Importing fetchUserData component
import backgroundImage from '../assets/background.jpg';
import MainStyle from '../styles/MainStyle.js';
import { db } from "../firebase.js"; 
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MatchmakingScreen({ navigation, route }) {
    //General list of names
    const [firstNames, setFirstNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);
    const [names, setNames] = useState([]);
    const [person2, setPerson2] = useState('');
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const collectionRef = collection(db, "UserData");
                // Fetch documents
                const querySnapshot = await getDocs(collectionRef);
                const firstNames = [];
                const lastNames = [];
                const fullNames = []; 
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    firstNames.push(userData.FirstName);
                    lastNames.push(userData.LastName);
                    const fullName = `${userData.FirstName} ${userData.LastName}`;
                    fullNames.push(fullName)
                });
                setFirstNames(firstNames);
                setLastNames(lastNames);
                setNames(fullNames);
                // DO NOT REMOVE THIS CONSOLE.LOG UNLESS  WANT TO BREAK EVERYTHING
                console.log(firstNames,lastNames, names)
            } catch (error) {
                console.error("Error fetching names: ", error);
            }
        };
    
        fetchNames();
    }, []); // Empty dependency array to run once on component mount
    
    const handleNameChange = (name, index) => {
        setPerson2(name);
        setIndex(index);
    };

    // For Person 1
    // const [emailPerson1, setEmailPerson1] = useState('');
    // const [firstNamePerson1, setFirstNamePerson1] = useState('');
    // const [lastNamePerson1, setLastNamePerson1] = useState('');
    // const [dateOfBirthPerson1, setDateOfBirthPerson1] = useState(new Date());
    // const [genderPerson1, setGenderPerson1] = useState('');
    // const [dietaryRestrictionsPerson1, setDietaryRestrictionsPerson1] = useState([]);
    // const [smokingPerson1, setSmokingPerson1] = useState(false);
    // const [petsPerson1, setPetsPerson1] = useState(false);
    // const [riseTimePerson1, setRiseTimePerson1] = useState('');
    // const [sleepTimePerson1, setSleepTimePerson1] = useState('');
    // const [personalityTypePerson1, setPersonalityTypePerson1] = useState('');

    // For Person 2
    // const [emailPerson2, setEmailPerson2] = useState('');
    // const [firstNamePerson2, setFirstNamePerson2] = useState('');
    // const [lastNamePerson2, setLastNamePerson2] = useState('');
    // const [dateOfBirthPerson2, setDateOfBirthPerson2] = useState(new Date());
    // const [genderPerson2, setGenderPerson2] = useState('');
    // const [dietaryRestrictionsPerson2, setDietaryRestrictionsPerson2] = useState([]);
    // const [smokingPerson2, setSmokingPerson2] = useState(false);
    // const [petsPerson2, setPetsPerson2] = useState(false);
    // const [riseTimePerson2, setRiseTimePerson2] = useState('');
    // const [sleepTimePerson2, setSleepTimePerson2] = useState('');
    // const [personalityTypePerson2, setPersonalityTypePerson2] = useState('');

    const { serializableUser } = route.params;
    const queryRef = query(collection(db, "UserData"), where("Email", "==", serializableUser.email));

    // getDocs(queryRef)
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const userData = doc.data();
    //         // Access individual fields from userData object
    //         setEmailPerson1(userData.Email);
    //         const date = new Date(userData.DoB);
    //         const formattedDate = date.toLocaleDateString();
    //         setDateOfBirthPerson1(formattedDate);
    //         setFirstNamePerson1(userData.FirstName);
    //         setLastNamePerson1(userData.LastName);
    //         setGenderPerson1(userData.Gender);
            
    //         // Access more fields as neededAttempt to access matchmaking features
    //         // May not have been updates yet
    //         if ('DietaryRestrictions' in userData) setDietaryRestrictionsPerson1(userData.DietaryRestrictions);
    //         if ('Smoking' in userData) setSmokingPerson1(userData.Smoking);
    //         if ('Pets' in userData) setPetsPerson1(userData.Pets);
    //         if ('RiseTime' in userData) setRiseTimePerson1(userData.RiseTime);
    //         if ('SleepTime' in userData) setSleepTimePerson1(userData.SleepTime);
    //         if ('PersonalityType' in userData) setPersonalityTypePerson1(userData.PersonalityType);
    //     });
    // })
    // .catch((error) => {
    //     console.error("Error getting documents:", error);
    // });

    const toMain = () => {
        navigation.pop();
    };

    const renderHeader = () => {
        return (
            <View style={MainStyle.header}>
              <View style={MainStyle.headerTitle}>
                <Text style={MainStyle.headerText}>Matchmaking Screen</Text>
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
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
                <Text>Select a potential match:</Text>
                <Picker
                    selectedValue={person2}
                    onValueChange={(itemValue, index) => handleNameChange(itemValue, index)}
                    >
                    <Picker.Item label="-- Select a person to match with --" value="" />
                    {names.map((person, index) => (
                        <Picker.Item key={index} label={person} value={person} />
                    ))}
                </Picker>
            </View>
            <UserDetails firstName={firstNames[index]} lastName={lastNames[index]} />
            {renderFooter()}
          </View>
        </ImageBackground>
    );
}