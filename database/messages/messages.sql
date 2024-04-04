CREATE TABLE messaging (
    MessageId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Content TEXT NOT NULL,
    SenderId INTEGER NOT NULL,
    RecipientId INTEGER NOT NULL,
    Timestamp DATETIME NOT NULL,
    CONSTRAINT fk_SenderId FOREIGN KEY (SenderId) REFERENCES BasicUser(UserId),
    CONSTRAINT fk_RecipientId FOREIGN KEY (RecipientId) REFERENCES BasicUser(UserId)
);