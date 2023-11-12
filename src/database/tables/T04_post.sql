CREATE TABLE IF NOT EXISTS post (
  post_id INT NOT NULL,
  forum_id INT NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (post_id, forum_id),
  FOREIGN KEY (author_id) REFERENCES user(id)
);