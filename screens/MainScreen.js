import React from 'react';
import { Image, Text, View } from 'react-native';
import InlineTextButton from '../components/inlineTextButton.js';
import AppStyle from '../styles/AppStyle';
import MainStyle from '../styles/MainStyle';

export default function MainScreen({ navigation }) { 
  const toSearch = () => {
    navigation.navigate('Search');
  }

  const toMatchmaking = () => {
    navigation.navigate('Matchmaking');
  }

  const toUtilities = () => {
    navigation.navigate('Utlilities');
  }

  return (
    <View style={AppStyle.container}>
      <View style={MainStyle.header}>
        <Text style={MainStyle.headerText}>Flat Finder App</Text>
      </View>
      <View style={MainStyle.gridContainer}>
        <View style={MainStyle.gridContainer}>
          {/* Top 2 Rows */}
          <View style={MainStyle.gridContainer}>
            {/* Top 3 Rows */}
            <View style={MainStyle.gridRow}>
                <View style={MainStyle.gridItem}>
                <Text><InlineTextButton text='Search' onPress={toSearch}/></Text>
              </View>
              <View style={MainStyle.gridItem}>
                <Text><InlineTextButton text='Matchmaking' onPress={toMatchmaking}/></Text>
              </View>
              <View style={MainStyle.gridItem}>
                <Text><InlineTextButton text='Utility' onPress={toUtilities}/></Text>
              </View>
            </View>
            <View style={MainStyle.gridRow}>
              <View style={MainStyle.gridItem}><Text>4</Text></View>
              <View style={MainStyle.gridItem}><Text>5</Text></View>
              <View style={MainStyle.gridItem}><Text>6</Text></View>
            </View>
            <View style={MainStyle.gridRow}>
              <View style={MainStyle.gridItem}><Text>7</Text></View>
              <View style={MainStyle.gridItem}><Text>8</Text></View>
              <View style={MainStyle.gridItem}><Text>9</Text></View>
            </View>
            {/* Bottom Combined Box */}
            <View style={MainStyle.gridRow}>
              <View style={MainStyle.combinedBox}><Text style={MainStyle.centeredText}>Welcome Employee</Text></View>
            </View>
          </View>
        </View>
      </View>
      <View style={MainStyle.footer}>
        <Text style={MainStyle.footerText}>Footer Section</Text>
      </View>
    </View>
  );
}