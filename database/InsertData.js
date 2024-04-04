import * as SQLite from 'expo-sqlite';

// Define addAddresses function
const addAddresses = (db, addresses) => {
  db.transaction(tx => {
    addresses.forEach(address => {
      const { street, city, postcode } = address;
      tx.executeSql(
        'INSERT INTO address_ (Street, City, Postcode) VALUES (?, ?, ?)',
        [street, city, postcode],
        (txObj, resultSet) => {
          console.log(`Address inserted with ID: ${resultSet.insertId}`);
        },
        (txObj, error) => {
          console.log('Error inserting address:', error);
        }
      );
    });
  },
  // Success callback for the transaction
  (txObj) => {
    console.log('Transaction completed successfully');
  },
  // Error callback for the transaction
  (error) => {
    console.log('Transaction error:', error);
  });
};

// Define addresses array
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

// Define InsertData function
export function InsertData() {
    // Opens database
    const db = SQLite.openDatabase('flatFinder.db');
    addAddresses(db, addresses);
}