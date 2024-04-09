import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
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
    textAlign:'center'
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