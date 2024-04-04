CREATE TABLE flat (
    Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    AddressId INTEGER NOT NULL,
    City VARCHAR(30),
    Price NUMERIC(10, 2),
    Type VARCHAR(5) CHECK (Type IN ('house', 'flat')),
    NumBedrooms INTEGER,
    Description TEXT,
    CONSTRAINT fk_AddressID FOREIGN KEY (AddressId) REFERENCES address_(Id)
);