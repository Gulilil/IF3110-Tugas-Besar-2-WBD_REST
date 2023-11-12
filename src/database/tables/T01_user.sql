CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  linked BOOLEAN NOT NULL,
  follower_count INT NOT NULL CHECK (follower_count >= 0)
);