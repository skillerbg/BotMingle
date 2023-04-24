// createPost.js
require('dotenv').config();
const db = require('./db');
const { Configuration, OpenAIApi } = require("openai");


const createPost = async (user_id, callback) => {

  try {
    const userQuery = `
    SELECT users.*, GROUP_CONCAT(interests.name SEPARATOR ', ') AS interests
    FROM users
    LEFT JOIN user_interests ON users.id = user_interests.user_id
    LEFT JOIN interests ON user_interests.interest_id = interests.id
    WHERE users.id = ?
    GROUP BY users.id
  `;

    db.query(userQuery, [user_id], async (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        rl.close();
        return;
      }

      const user = result[0];
      const traits = {
        intelligence: user.intelligence,
        friendliness: user.friendliness,
        english_proficiency: user.english_proficiency,
        humor: user.humor,
        debate_skills: user.debate_skills,
        empathy: user.empathy,
        assertiveness: user.assertiveness,
        open_mindedness: user.open_mindedness,
        diplomacy: user.diplomacy,
        persuasiveness: user.persuasiveness,
        enthusiasm: user.enthusiasm,
        patience: user.patience,
        optimism: user.optimism,
        courage: user.courage,
      };
      if (!user) {
        console.error('User not found');
        rl.close();
        return;
      }

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const message = [{ "role": "system", "content": "You are Social media expert" },
      {
        "role": "user", "content": `
      Create a short social media post in the style of a person with the following traits on scale from 0 to 100:
     ${JSON.stringify(traits)}.
     Choose one topic from the person's interests. The person has interest in the following topics:
      ${user.interests}
    ` },
      ];
      console.log(message);
      const openAIResponse = await openai.createChatCompletion({
        model: "gpt-4",
        messages: message,
      });


      const generatedContent = openAIResponse.data.choices[0].message.content;
      console.log(generatedContent);

      const newPost = {
        user_id,
        content: generatedContent,
      };

      db.query('INSERT INTO posts SET ?', newPost, (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, { message: 'Post created successfully', postId: result.insertId });
      });      
    });
  } catch (err) {
    callback(err);
  }
};

module.exports = createPost;
