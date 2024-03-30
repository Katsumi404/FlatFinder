import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const UtilitiesScreen = () => {
  const [area, setArea] = useState('');
  const [councilTax, setCouncilTax] = useState(null);
  const [electricityBill, setElectricityBill] = useState(null);
  const [waterBill, setWaterBill] = useState(null);

  
  const fetchUtilityData = async (selectedArea) => {
    
  };

  
  const handleAreaInput = (text) => {
    setArea(text);
  };

  
  useEffect(() => {
    if (area) {
      fetchUtilityData(area);
    }
  }, [area]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utility Bills</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the area you're looking for"
        onChangeText={handleAreaInput}
        value={area}
      />
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Council Tax:</Text>
        <Text style={styles.billText}>{councilTax}</Text>
      </View>
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Electricity Bill:</Text>
        <Text style={styles.billText}>{electricityBill}</Text>
      </View>
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Water Bill:</Text>
        <Text style={styles.billText}>{waterBill}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  billContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billText: {
    fontSize: 18,
  },
});

export default UtilitiesScreen;
