import * as SQLite from 'expo-sqlite';

export function CreateDatabase() {
  //Opens database
  const db = SQLite.openDatabase('flatFinder.db');
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS address_ (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Street VARCHAR(255) NOT NULL,
        City VARCHAR(100) NOT NULL,
        Postcode VARCHAR(7) NOT NULL CHECK (Postcode GLOB '[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}')
      )`,
      [], // Empty array for parameters (no values needed)
      (tx, results) => {
        console.log("Address table created successfully!");
        resolve(); // Resolve the promise if successful
      },
      (error) => {
        console.error("Error creating address table:", error);
        reject(error); // Reject the promise if there's an error
      }
    );
  });

//   db.transaction(tx => {
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS user (
//         Id INTEGER PRIMARY KEY AUTOINCREMENT,
//         Role TEXT NOT NULL,
//         FirstName TEXT NOT NULL,
//         LastName TEXT NOT NULL,
//         password TEXT NOT NULL,
//         DateOfBirth DATE NOT NULL,
//         Gender TEXT NOT NULL,
//         AddressID INTEGER,
//         Smoking BOOLEAN,
//         Pets BOOLEAN,
//         Social BOOLEAN,
//         Organized BOOLEAN,
//         Lifestyle TEXT,
//         CONSTRAINT fk_AddressID FOREIGN KEY (AddressID) REFERENCES address_(Id)
//     );```);
//   });

//   db.transaction(tx => {
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS flat (
//         Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//         AddressId INTEGER NOT NULL,
//         City VARCHAR(30),
//         Price NUMERIC(10, 2),
//         Type VARCHAR(5) CHECK (Type IN ('house', 'flat')),
//         NumBedrooms INTEGER,
//         Description TEXT,
//         CONSTRAINT fk_AddressID FOREIGN KEY (AddressId) REFERENCES address_(Id)
//     );```)
//   });

//   db.transaction(tx => {
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS savedListing (
//         UserId INTEGER NOT NULL,
//         FlatId INTEGER NOT NULL,
//         PRIMARY KEY (UserId, FlatId),
//         CONSTRAINT fk_User FOREIGN KEY (UserId) REFERENCES user(Id),
//         CONSTRAINT fk_Flat FOREIGN KEY (FlatId) REFERENCES flat(Id)
//     );```)
//   });

//   db.transaction(tx => {
//     tx.executeSql(```CREATE TABLE IF NOT EXISTS messaging (
//         MessageId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//         Content TEXT NOT NULL,
//         SenderId INTEGER NOT NULL,
//         RecipientId INTEGER NOT NULL,
//         Timestamp DATETIME NOT NULL,
//         CONSTRAINT fk_SenderId FOREIGN KEY (SenderId) REFERENCES BasicUser(UserId),
//         CONSTRAINT fk_RecipientId FOREIGN KEY (RecipientId) REFERENCES BasicUser(UserId)
//     );```)
//   });

};