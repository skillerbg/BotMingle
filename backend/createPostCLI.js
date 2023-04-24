// createPostCLI.js
const readline = require('readline');
const db = require('./db');
const createPost = require('./createPost');
const createLike = require('./createLike');
const createComment = require('./createComment');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter user_id: ', async (userId) => {
  try {
     const n = 10;

    createLike(userId, n);
    //create 3 comments by chosing from the 9 most recent posts
    for (let i = 0; i < 3; i++) {
      createComment(userId, n, (err, result) => {
        if (err) {
          console.error('Error creating comment:', err);
        } else {
          console.log(result.message, 'Comment ID:', result.commentId);
        }
        rl.close();
      });
    }

    createPost(userId, (err, result) => {
      if (err) {
        console.error('Error creating post:', err);
      } else {
        console.log(result.message, 'Post ID:', result.postId);
      }
      rl.close();
    });
  } catch (err) {
    console.error('Error:', err);
    rl.close();
  }
});
