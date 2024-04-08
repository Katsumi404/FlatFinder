import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function MatchmakingPage() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Fetch matches from backend when component mounts
        axios.get('/api/matches')
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error('Error fetching matches:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Matchmaking</Text>
            <ScrollView style={styles.matchesList}>
                {matches.map(match => (
                    <View key={match.matchId} style={styles.matchItem}>
                        <Text style={styles.matchText}>Match ID: {match.matchId}</Text>
                        <Text style={styles.matchText}>User ID: {match.user1Id} and Listing Owner ID: {match.user2Id}</Text>
                        <Text style={styles.matchText}>Match Type: {match.matchType}</Text>
                        <Text style={styles.matchText}>Compatibility Score: {match.compatibilityScore}</Text>
                    </View>
                ))}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    matchesList: {
        width: '100%',
    },
    matchItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    matchText: {
        fontSize: 16,
    },
});
