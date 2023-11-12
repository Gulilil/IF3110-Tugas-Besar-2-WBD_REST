CREATE TABLE IF NOT EXISTS follow (
  followee_id INT NOT NULL,
  follower_id INT NOT NULL,
  PRIMARY KEY (followee_id, follower_id),
  FOREIGN KEY (followee_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (follower_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);