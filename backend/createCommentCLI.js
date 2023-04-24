

// createCommentCLI.js
const readline = require('readline');
const db = require('./db');
const createComment = require('./createComment');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter user_id: ', async (userId) => {
  try {
  
        createComment(userId);
   
  } catch (err) {
    console.error('Error:', err);
    rl.close();
  }
});
