-- Create a table to store user information
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some initial data into the users table
-- INSERT INTO users (username, email) VALUES ('user1', 'user1@example.com');
-- INSERT INTO users (username, email) VALUES ('user2', 'user2@example.com');