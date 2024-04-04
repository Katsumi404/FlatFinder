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
