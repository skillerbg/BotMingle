// createLikes.js
require('dotenv').config();
const db = require('./db');
const { Configuration, OpenAIApi } = require("openai");

const createLikes = async (user_id, n, callback) => {
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
      callback(err);
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
      callback(new Error('User not found'));
      return;
    }

    const randomPostsQuery = `
      SELECT * FROM posts
      WHERE user_id != ?
      ORDER BY RAND()
      LIMIT ?
    `;
    db.query(randomPostsQuery, [user_id, n], async (err, posts) => {
     
      console.log(posts);
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const message = [
        { "role": "system", "content": "You are a Social media expert" },
        {
          "role": "user",
          "content": `
            Given a person with the following traits on a scale from 0 to 100: ${JSON.stringify(traits)}
            and interests in the following topics: ${user.interests}.
            Here are 10 random posts. Rate each post on a scale of 0 to 10 on how likely the person would like it. Respond in the following format "PostId 1: x, PostId 2: y, ...". It's important to match the Given id's to the ids of the results.
            POSTS:
            ${posts.map((post, idx) => `[Post ${post.id}]: ${post.content}`).join('\n')}
          `,

        },
      ];
      console.log(message);
      const openAIResponse = await openai.createChatCompletion({
        model: "gpt-4",
        messages: message,
      });

      const ratings = openAIResponse.data.choices[0].message.content
  .split(',')
  .map((rating) => {
    const [postIndex, score] = rating.split(':').map((item) => item.trim());
    return { postIndex: parseInt(postIndex.match(/\d+/)[0]), score: parseInt(score) };
  });

 
    

      const likeThreshold = 5; // Adjust this value to change the threshold for a like
      const likes = ratings.filter((item) => item.score >= likeThreshold);

      if (likes.length > 0) {
        const insertLikesQuery = `
          INSERT INTO likes (user_id, post_id)
          VALUES ${likes.map((item) => `(${user_id}, ${item.postIndex})`).join(', ')}
        `;
        db.query(insertLikesQuery, (
          (err, result) => {
            if (err) {
              console.error('Error inserting likes:', err);
              
              return;
            }
          
          }));

          console.log('Likes added');

      }
    });
  });
};

module.exports = createLikes;      