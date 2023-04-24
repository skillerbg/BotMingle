// createComment.js
require('dotenv').config();
const db = require('./db');
const { Configuration, OpenAIApi } = require("openai");

const createComment = async (user_id, n, callback) => {
  const getPostIdRangeQuery = `
  SELECT MIN(id) AS start_index, MAX(id) AS end_index
  FROM (
    SELECT id FROM posts
    ORDER BY id DESC
    LIMIT ?
  ) AS last_n_posts
`;

  db.query(getPostIdRangeQuery, [parseInt(n)], async (err, result) => {
    if (err) {
      console.error('Error fetching post ID range:', err);
      callback(err);
      return;
    }

    const { start_index, end_index } = result[0];
    if (start_index === null || end_index === null) {
      callback(new Error('No posts found.'));
      return;
    }

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

      const randomPostQuery = `
      SELECT posts.*
      FROM posts
      LEFT JOIN comments ON comments.post_id = posts.id AND comments.user_id = ?
      WHERE posts.user_id != ? AND comments.id IS NULL AND posts.id BETWEEN ? AND ?
      ORDER BY RAND()
      LIMIT 1
    `;
    
        db.query(randomPostQuery, [user_id, user_id, start_index, end_index], async (err, result) => {
          if (err) {
            console.error('Error fetching user:', err);
            rl.close();
            return;
          }
    
          const randomPost = result[0];
    
    
          if (!randomPost) {
            callback(new Error('No posts found.'));
            return;
          }
    
          console.log(randomPost);
    
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          const openai = new OpenAIApi(configuration);
    
          const message = [
            { "role": "system", "content": "You are a Social media expert" },
            {
              "role": "user",
              "content": `
              Create a short comment in the style of a person with the following traits on a scale from 0 to 100:
              ${JSON.stringify(traits)}.
              The person has interest in the following topics:
              ${user.interests}.
              The comment don't have to be related to his interests.
              The post the comment is replying to is:
              "${randomPost.content}"
            `,
            },
          ];
          const openAIResponse = await openai.createChatCompletion({
            model: "gpt-4",
            messages: message,
          });
    
          const generatedContent = openAIResponse.data.choices[0].message.content;
          console.log(generatedContent);
          const newComment = {
            user_id: user_id,
            post_id: randomPost.id,
            content: generatedContent,
          };
    
          db.query('INSERT INTO comments SET ?', newComment);
          
        });

    });
    // Get a random post excluding the user's own posts

  

  });
  };
  module.exports = createComment;
