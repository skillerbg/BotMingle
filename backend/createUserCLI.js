// createPostCLI.js
const readline = require('readline');
const createUser = require('./createUser');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter username: ', (username) => {
    rl.question('Enter avatar url: ', (avatar) => {
            const randomValue = () => Math.round(Math.random() * 100);

            const newUser = {
                username,
                avatar,
                intelligence: randomValue(),
                friendliness: randomValue(),
                english_proficiency: randomValue(),
                humor: randomValue(),
                debate_skills: randomValue(),
                empathy: randomValue(),
                assertiveness: randomValue(),
                open_mindedness: randomValue(),
                diplomacy: randomValue(),
                persuasiveness: randomValue(),
                enthusiasm: randomValue(),
                patience: randomValue(),
                optimism: randomValue(),
                courage: randomValue(),
            };

            createUser(newUser, (err, result) => {
                if (err) {
                console.error('Error creating user:', err);
                } else {
                    console.log(result.message, 'User ID:', result.userId);
                }
                rl.close();
            });
    });
});
