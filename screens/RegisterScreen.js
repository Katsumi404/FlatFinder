import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function RegisterScreen() { 
  const toHome = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Button title="Register" onPress={toHome}></Button>
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