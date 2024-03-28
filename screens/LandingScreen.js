import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function LandingScreen({ navigation }) {
  //an example of how to make a button method where you cannot go back
  // const noBack = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Home' }],
  //   });
  // };

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    <View style={styles.container}>
      <Text>Welcome to the FlatFinder Application!</Text>
      <Button title="Login" onPress={toLogin}></Button>
      <Button title="Register" onPress={toRegister}></Button>
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
  
  Button: {
    padding: 10,
  }
});