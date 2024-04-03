import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

// expo add expo-sqlite
export default function MainScreen() { 
    const [db, setDb] = useState(SQLite.openDatabase('users.db'));
    const [isLoading, setLoading] = useState(true);
    const [names, setNames] = useState([]);
    const [currentName, setCurrentName] = useState('');
  
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
      });
  
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM users', null,
          (txObj, resultSet) => setNames(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
  
      setLoading(false);
    }, []);
  
    const addName = () => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO users (name) VALUES (?)', [currentName],
          (txObj, resultSet) => {
            let existingNames = [...names];
            existingNames.push({ id: resultSet.insertId, name: currentName });
            setNames(existingNames);
            setCurrentName('');
          },
          (txObj, error) => console.log(error)
        );
      });
    };

    const deleteName = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM users where id=?', [id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    let existingNames = [...names].filter(name => name.id !== id);
                    setNames(existingNames);
                }
            },
            (txObj, error) => console.log(error)
            );
        });
    };

    const updateName = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE users SET name = ? WHERE id = ?', [currentName, id],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        let existingNames = [...names];
                        const indexToUpdate = existingNames.findIndex(name => name.id === id);
                        existingNames[indexToUpdate].name = currentName;
                        setNames(existingNames);
                        setCurrentName('');
                    }
                },
                (txObj, error) => console.log(error)
            );
        });
    }
  
    const showNames = () => {
      return names.map((name, index) => {
        return (
          <View style={styles.row} key={index}>
            <Text>{name.name}</Text>
            <Button title='Delete' onPress={() => deleteName(name.id)} />
            <Button title='Update' onPress={() => updateName(name.id)} />
          </View>
        );
      });
    };
  
    if (isLoading) {
      return (
        <View>
          <Text>Loading names...</Text>
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
        <TextInput value={currentName} placeholder='Enter name' onChangeText={setCurrentName} style={styles.input}></TextInput>
        <Button title="Add Name" onPress={addName} />
        {showNames()}
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

  input: {
    width: '80%', 
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyConent: 'space-between',
    margin: 8
  }
});

//individual database will go in the pages that they are needed in
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

// Open or create SQLite database
const db = SQLite.openDatabase('flatFinder.db');

// Function to execute SQL commands from a file
const executeSqlFromFile = async (filePath) => {
  try {
    // Read SQL file content
    const sqlContent = await FileSystem.readAsStringAsync(filePath);
    
    // Split SQL commands
    const sqlCommands = sqlContent.split(';').filter(command => command.trim() !== '');

    // Execute each SQL command
    db.transaction(tx => {
      sqlCommands.forEach(sqlCommand => {
        tx.executeSql(
          sqlCommand,
          [],
          (_, resultSet) => {
            // Handle success if needed
          },
          (_, error) => {
            console.error('Error executing SQL command:', error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Error reading or executing SQL file:', error);
  }
};

// Call the function to execute SQL commands from the file
executeSqlFromFile('./database/master.sql');