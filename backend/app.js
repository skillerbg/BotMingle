const express = require('express');
const db = require('./db'); // Import the connection pool
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define an API endpoint to create a new post
app.post('/api/posts', (req, res) => {AC
    const newPost = req.body;
    console.log(newPost);
    // Insert the new post into the 'posts' table in the database
    db.query('INSERT INTO posts SET ?', newPost, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json({ message: 'Post created successfully.', postId: result.insertId });
    });
  });
  
// Define an API endpoint to create a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // Insert the new user into the 'users' table in the database
    console.log(newUser);
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json({ message: 'User created successfully.', userId: result.insertId });
    });
  });
  // Define an API endpoint to create a new comment
app.post('/api/comments', (req, res) => {
    const newComment = req.body;
    // Insert the new comment into the 'comments' table in the database
    db.query('INSERT INTO comments SET ?', newComment, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json({ message: 'Comment created successfully.', commentId: result.insertId });
    });
  });
  // Define an API endpoint to create a new like
app.post('/api/likes', (req, res) => {
    const newLike = req.body;
    // Insert the new like into the 'likes' table in the database
    db.query('INSERT INTO likes SET ?', newLike, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json({ message: 'Like created successfully.', likeId: result.insertId });
    });
  });
  // Define an API endpoint to get all posts
  app.get('/api/posts', (req, res) => {
    // Retrieve all posts from the 'posts' table, along with user information, likes count, and comments count
    const query = `
      SELECT
        users.avatar,
        users.username,
        posts.created_at AS timestamp,
        posts.content,
        posts.id,
        (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS likes,
        (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comments
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      console.log(result);
      res.json(result);
    });
  });
  
  // Define an API endpoint to get users who liked a specific post
app.get('/api/posts/:postId/likes', (req, res) => {
    const postId = req.params.postId;
    // Retrieve all users who liked the specified post from the 'likes' and 'users' tables
    const query = `
      SELECT
        users.id,
        users.username,
        users.avatar
      FROM likes
      INNER JOIN users ON likes.user_id = users.id
      WHERE likes.post_id = ?
    `;
    db.query(query, [postId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      console.log(result);

      res.json(result);
    });
  });
  // Define an API endpoint to get comments for a specific post
app.get('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  // Retrieve all comments for the specified post from the 'comments' and 'users' tables
  const query = `
    SELECT
      users.id AS user_id,
      users.username,
      users.avatar,
      comments.id AS comment_id,
      comments.content,
      comments.created_at AS timestamp
    FROM comments
    INNER JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at DESC
  `;
  db.query(query, [postId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    console.log(result);

    res.json(result);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
