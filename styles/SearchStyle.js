import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
  },

  input: {
    width: '80%', 
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center'
  },
  picker:{
    textAlign:'center'
  },
  label:{
    fontWeight:'bold'
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  }
});