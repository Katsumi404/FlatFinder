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
    color: '#5FB15F',  
    textDecorationLine: 'underline',   
  },
  inLineTextButtonPressed: {
    color: '#5FB15F',  
    opacity: 0.6,
    textDecorationLine: 'underline',
  },
  button: {
    margin: 10,
    padding: 10,
  },
})