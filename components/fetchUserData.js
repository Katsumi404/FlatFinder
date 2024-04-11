import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { db } from "../firebase.js"; 
import { collection, query, where, getDocs } from "firebase/firestore";

const UserDetails = ({ firstName, lastName }) => {
    const [userData, setUserData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [smoking, setSmoking] = useState(false);
    const [pets, setPets] = useState(false);
    const [riseTime, setRiseTime] = useState('');
    const [sleepTime, setSleepTime] = useState('');
    const [personalityType, setPersonalityType] = useState('');

    useEffect(() => {
        const fetchUserData = async (firstName, lastName) => {
            try {
                const collectionRef = collection(db, "UserData");
                const queryRef = query(collectionRef, where("FirstName", "==", firstName), where("LastName", "==", lastName));
                const querySnapshot = await getDocs(queryRef);
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
                    setUserData(userData);
                    // Assuming other user data is present in userData object, you can set them like this
                    setUid(userData.id || '');
                    setEmail(userData.email || '');
                    setDateOfBirth(userData.dateOfBirth || new Date());
                    setGender(userData.gender || '');
                    setDietaryRestrictions(userData.dietaryRestrictions || []);
                    setSmoking(userData.hasOwnProperty('smoking') ? userData.smoking : false);
                    setPets(userData.hasOwnProperty('pets') ? userData.pets : false);
                    setRiseTime(userData.riseTime || '');
                    setSleepTime(userData.sleepTime || '');
                    setPersonalityType(userData.personalityType || '');
                } else {
                    console.log("No user found with the provided first and last name.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(firstName, lastName);
    }, [firstName, lastName]);

    return (
        <View>
            {userData ? (
                <View>
                    <Text>User ID: {userData.id}</Text>
                    <Text>Email: {userData.email}</Text>
                    <Text>First Name: {userData.firstName}</Text>
                    <Text>Last Name: {userData.lastName}</Text>
                    <Text>Date of Birth: {userData.dateOfBirth}</Text>
                    <Text>Gender: {userData.gender}</Text>
                    <Text>Dietary Restrictions: {userData.dietaryRestrictions}</Text>
                    <Text>Smoking: {userData.smoking ? 'Yes' : 'No'}</Text>
                    <Text>Pets: {userData.pets ? 'Yes' : 'No'}</Text>
                    <Text>Rise Time: {userData.riseTime}</Text>
                    <Text>Sleep Time: {userData.sleepTime}</Text>
                    <Text>Personality Type: {userData.personalityType}</Text>
                    {/* Add more user details as needed */}
                    {userData.photoURL ? (
                        <Image source={{ uri: userData.photoURL }} style={{ width: 100, height: 100 }} />
                    ) : (
                        <Text>No profile picture available</Text>
                    )}
                </View>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

export default UserDetails;