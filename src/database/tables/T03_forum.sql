CREATE TABLE IF NOT EXISTS forum (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  post_count INT NOT NULL CHECK (post_count >= 1),
  FOREIGN KEY (author_id) REFERENCES user(id)
);