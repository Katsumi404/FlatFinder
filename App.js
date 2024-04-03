import React from 'react';
//Navigation element imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
//Pages for the App imports
import LandingScreen from "./screens/LandingScreen.js";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import MainScreen from "./screens/MainScreen.js";
import MatchmakingScreen from "./screens/MatchmakingScreen.js";
import UtilitiesScreen from "./screens/UtilitiesScreen.js";
//Imports database fetching method
import * as SQLite from 'expo-sqlite';
//import { DatabaseManager } from './database/DatabaseManager.js';

//Creates way to navigate the pages
const Stack = createNativeStackNavigator();

export default function App() {
  class DatabaseManager {
    constructor(db) {
      this.db = SQLite.openDatabase('flatFinder.db');
    }

    async createAddressTable() {
      return new Promise((resolve, reject) => {
        this.db.transaction(async tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS address_ (
              Id INTEGER PRIMARY KEY AUTOINCREMENT,
              Street VARCHAR(255) NOT NULL,
              City VARCHAR(100) NOT NULL,
              Postcode VARCHAR(7) NOT NULL
            )`,
            [],
            (_, results) => {
              console.log("Address table created successfully!");
              resolve();
            },
            error => {
              console.error("Error creating address table:", error);
              reject(error);
            }
          );
        });
      });
    }

    async createUserTable() {
      return new Promise((resolve, reject) => {
        this.db.transaction(async tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user (
              Id INTEGER PRIMARY KEY AUTOINCREMENT,
              Role TEXT NOT NULL,
              FirstName TEXT NOT NULL,
              LastName TEXT NOT NULL,
              password TEXT NOT NULL,
              DateOfBirth DATE NOT NULL,
              Gender TEXT NOT NULL,
              AddressID INTEGER,
              Smoking BOOLEAN,
              Pets BOOLEAN,
              Social BOOLEAN,
              Organized BOOLEAN,
              Lifestyle TEXT,
              CONSTRAINT fk_AddressID FOREIGN KEY (AddressID) REFERENCES address_(Id)
            )`,
            [],
            (_, results) => {
              console.log("User table created successfully!");
              resolve();
            },
            error => {
              console.error("Error creating user table:", error);
              reject(error);
            }
          );
        });
      });
    }

    async createFlatTable() {
      return new Promise((resolve, reject) => {
        this.db.transaction(async tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS flat (
              Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              AddressId INTEGER NOT NULL,
              City VARCHAR(30),
              Price NUMERIC(10, 2),
              Type VARCHAR(5) CHECK (Type IN ('house', 'flat')),
              NumBedrooms INTEGER,
              Description TEXT,
              CONSTRAINT fk_AddressID FOREIGN KEY (AddressId) REFERENCES address_(Id)
            )`,
            [],
            (_, results) => {
              console.log("Flat table created successfully!");
              resolve();
            },
            error => {
              console.error("Error creating flat table:", error);
              reject(error);
            }
          );
        });
      });
    }

    async createSavedListingTable() {
      return new Promise((resolve, reject) => {
        this.db.transaction(async tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS savedListing (
              UserId INTEGER NOT NULL,
              FlatId INTEGER NOT NULL,
              PRIMARY KEY (UserId, FlatId),
              CONSTRAINT fk_User FOREIGN KEY (UserId) REFERENCES user(Id),
              CONSTRAINT fk_Flat FOREIGN KEY (FlatId) REFERENCES flat(Id)
            )`,
            [],
            (_, results) => {
              console.log("SavedListing table created successfully!");
              resolve();
            },
            error => {
              console.error("Error creating savedListing table:", error);
              reject(error);
            }
          );
        });
      });
    }

    async createMessagingTable() {
      return new Promise((resolve, reject) => {
        this.db.transaction(async tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS messaging (
              Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              Content TEXT NOT NULL,
              SenderId INTEGER NOT NULL,
              RecipientId INTEGER NOT NULL,
              Timestamp DATETIME NOT NULL,
              CONSTRAINT fk_SenderId FOREIGN KEY (SenderId) REFERENCES BasicUser(UserId),
              CONSTRAINT fk_RecipientId FOREIGN KEY (RecipientId) REFERENCES BasicUser(UserId)
            )`,
            [],
            (_, results) => {
              console.log("Messaging table created successfully!");
              resolve();
            },
            error => {
              console.error("Error creating messaging table:", error);
              reject(error);
            }
          );
        });
      });
    }

    async populateAddressTable() {
      const addresses = [
        { street: '10 Downing Street', city: 'London', postcode: 'SW1A 2AB' },
        { street: '221B Baker Street', city: 'London', postcode: 'NW1 6XF' },
        { street: '1 Savile Row', city: 'London', postcode: 'W1S 3PE' },
        { street: '32 Portobello Road', city: 'London', postcode: 'W11 1LB' },
        { street: '18 Pall Mall', city: 'London', postcode: 'SW1Y 5LW' },
        { street: '12 Oak Lane', city: 'Leeds', postcode: 'LE1 1AA' },
        { street: '30 Maple Street', city: 'Leeds', postcode: 'LE1 1BB' },
        { street: '5 Cedar Road', city: 'Leeds', postcode: 'LE1 1CC' },
        { street: '18 Pine Drive', city: 'Leeds', postcode: 'LE1 1DD' },
        { street: '9 Birch Court', city: 'Leeds', postcode: 'LE1 1EE' },
        { street: '7 River Road', city: 'Glasgow', postcode: 'GG1 1AA' },
        { street: '22 Mountain View', city: 'Glasgow', postcode: 'GG1 1BB' },
        { street: '14 Meadow Lane', city: 'Glasgow', postcode: 'GG1 1CC' },
        { street: '11 Lake Street', city: 'Glasgow', postcode: 'GG1 1DD' },
        { street: '6 Forest Avenue', city: 'Glasgow', postcode: 'GG1 1EE' },
        { street: '4 Ocean Drive', city: 'Brighton', postcode: 'BN1 1AA' },
        { street: '16 Harbor View', city: 'Brighton', postcode: 'BN1 1BB' },
        { street: '2 Beach Road', city: 'Brighton', postcode: 'BN1 1CC' },
        { street: '13 Cliffside Avenue', city: 'Brighton', postcode: 'BN1 1DD' },
        { street: '11 Seaside Lane', city: 'Brighton', postcode: 'BN1 1EE' },
      ];
      return new Promise((resolve, reject) => {
        this.db.transaction(
          tx => {
            addresses.forEach(address => {
              const { street, city, postcode } = address;
              tx.executeSql(
                'INSERT INTO address_ (Street, City, Postcode) VALUES (?, ?, ?)',
                [street, city, postcode],
                (_, resultSet) => {
                  console.log(`Address inserted with ID: ${resultSet.insertId}`);
                },
                (_, error) => {
                  console.error('Error inserting address:', error);
                }
              );
            });
          },
          error => {
            console.error('Transaction error:', error);
            reject(error);
          },
          () => {
            console.log('Transaction completed successfully');
            resolve();
          }
        );
      });
    }

    async initialize() {
      try {
        await this.createAddressTable();
        await this.createUserTable();
        await this.createFlatTable();
        await this.createSavedListingTable();
        await this.createMessagingTable();
        await this.populateAddressTable();
        console.log("Database initialization completed successfully.");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    }
  }
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Initialize the database manager
        const dbManager = new DatabaseManager();
        await dbManager.initialize();
        
        // Database initialization complete
        setLoading(false);
      } catch (error) {
        console.error('Error initializing database:', error);
        // Handle error here
      }
    };

    initializeDatabase();
  }, []);

  if (loading) {
    // If loading is true, render the LandingScreen
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="MatchmakingScreen" component={MatchmakingScreen} />
          <Stack.Screen name="UtilitiesScreen" component={UtilitiesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}