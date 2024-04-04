import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
    header: {
      height: 130, 
      backgroundColor: 'lightblue',
      width: '100%',
      alignItems: 'center',
      paddingTop: '15%', 
      paddingBottom:'10%',
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
      verticalAlign: 'center', // Center the text vertically
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
  