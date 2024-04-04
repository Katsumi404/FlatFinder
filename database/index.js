import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { db } from '../config';
import { ref, set } from 'firebase/database';

const AddData = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Function to add data to Firebase Realtime Database
    const addDataToFirebase = async () => {
        try {
            await set(ref(db, 'posts/' + title), {
                title: title,
                body: body
            });
            setTitle('');
            setBody('');
            console.log('Data added successfully!');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Realtime DB</Text>
            <TextInput
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                placeholder='Body'
                value={body}
                onChangeText={(text) => setBody(text)}
                style={styles.input}
            />
            <Button
                title='Add Data'
                onPress={addDataToFirebase}
            />
        </View>
    );
};

export default AddData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        fontSize: 30,
        textAlign: 'center', // Corrected property name
        marginTop: 100,
        fontWeight: 'bold'
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    }
});