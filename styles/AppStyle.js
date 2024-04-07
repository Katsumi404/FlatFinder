import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20C073',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: 'white',
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
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