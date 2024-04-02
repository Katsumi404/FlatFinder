import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native'

export default function MainScreen() { 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flat Finder App</Text>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridContainer}>
          {/* Top 2 Rows */}
          <View style={styles.gridContainer}>
            {/* Top 3 Rows */}
            <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                <Text>Search</Text>
              </View>
              <View style={styles.gridItem}><Text>2</Text></View>
              <View style={styles.gridItem}><Text>3</Text></View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}><Text>4</Text></View>
              <View style={styles.gridItem}><Text>5</Text></View>
              <View style={styles.gridItem}><Text>6</Text></View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}><Text>7</Text></View>
              <View style={styles.gridItem}><Text>8</Text></View>
              <View style={styles.gridItem}><Text>9</Text></View>
            </View>
            {/* Bottom Combined Box */}
            <View style={styles.gridRow}>
              <View style={styles.combinedBox}><Text style={styles.centeredText}t>Welcome Employee Zohaib Ahmed</Text></View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Section</Text>
      </View>
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
  header: {
    height: 130, 
    backgroundColor: 'lightblue',
    width: '100%',
    alignItems: 'center',
    paddingTop: '15%', 
    paddingBottom:'%',
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  combinedBox: {
    width: 200,
    height: 110,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredText: {
    textAlign: 'center',
    textAlignVertical: 'center', // Center the text vertically
  },

  gridContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '103%',
    paddingHorizontal: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
    marginTop: 10,
  },
  gridItem: {
    width: 110,
    height: 110,
    backgroundColor: 'lightgray',
    alignItems: 'flex-start', // Align text to the start of the cross-axis (top left)
    justifyContent: 'flex-start', // Align text to the start of the main axis (top left)
    paddingLeft: 20, // Adjust padding to provide some space between the text and the edges
    paddingTop: 20, // Adjust padding to provide some space between the text and the edges
  },

  footer: {
    height: 100,
    backgroundColor: 'lightblue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

    image: {
    width: 25, // Adjust width of the image as needed
    height: 25, // Adjust height of the image as needed
    position: 'absolute', // Position the image absolutely within the grid item
    bottom: 20, // Align the image to the bottom of the grid item
    left: 20, // Align the image to the left of the grid item
  },
});
