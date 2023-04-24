// getUserById.js
const db = require('./db');

const getUserById = (userId, callback) => {
  const query = `
    SELECT
      id, username, avatar, interests,
      intelligence, friendliness, english_proficiency, humor, debate_skills, empathy,
      assertiveness, open_mindedness, diplomacy, persuasiveness, enthusiasm, patience,
      optimism, courage
    FROM users
    WHERE id = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      callback(err);
    } else if (result.length === 0) {
      callback(new Error('User not found'));
    } else {
      callback(null, result[0]);
    }
  });
};

module.exports = getUserById;
