import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing'; 

export default function MainScreen() { 
  const downloadFromURL = async () => {
    const filename = "small.mp4";
    const result = await FileSystem.downloadAsync(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + filename
    );
      console.log(result);

    save(result.uri);
  }

  const save = (url) => {
    shareAsync(url);
  }

  return (
    <View style={styles.container}>
      <Button title="Download from URL" onPress={downloadFromURL} />
      <StatusBar style='auto' />
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
});
