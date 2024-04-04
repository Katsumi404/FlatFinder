CREATE TABLE users (
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
);