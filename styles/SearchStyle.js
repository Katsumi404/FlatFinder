import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
  
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 7.5,
    borderRadius: 5,
    flex: 1,
  },
  selectedButton: {
    backgroundColor: 'green',
    paddingHorizontal: 7.5,
    borderRadius: 5,
    flex: 1,
  },

  buttonText: {
    color: 'black',
    fontSize: 7.5,
  },
  selectedButtonText: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#cadbd0',
  },
  titleContainer: {
    marginBottom: 5,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  listItemText: {
    fontSize: 16,
  },
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  }, 

  input: {
    width: '80%', 
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin:'auto'
  }
  ,
  picker:{
    textAlign:'center',
    width:'150'
  },
  label:{
    fontWeight:'bold'
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  centredView: {
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
    width: '75%'
  }
});
