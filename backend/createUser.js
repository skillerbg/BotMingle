const db = require('./db');

async function createUser(user) {
    // First, insert the new user into the 'users' table
    const insertUserQuery = 'INSERT INTO users SET ?';
    const insertUserResult = await executeQuery(insertUserQuery, user);
    const userId = insertUserResult.insertId;

    // Fetch 20 random interests
    const randomInterests = await getRandomInterests();

    // Insert the user-interest relationships into the 'user_interests' table
    const insertUserInterestsPromises = randomInterests.map((interest) => {
        const userInterest = { user_id: userId, interest_id: interest.id };
        const query = 'INSERT INTO user_interests SET ?';
        return executeQuery(query, userInterest);
    });

    await Promise.all(insertUserInterestsPromises);

    return { message: 'User created successfully.', userId };


    function getRandomInterests() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM interests ORDER BY RAND() LIMIT 4`;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

};
function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  

module.exports = createUser;
