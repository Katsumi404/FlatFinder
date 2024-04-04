import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  inLineTextButton: {
    color: 'green',  
    textDecorationLine: 'underline',   
  },
  inLineTextButtonPressed: {
    color: 'green',  
    opacity: 0.6,
    textDecorationLine: 'underline',
  }
})