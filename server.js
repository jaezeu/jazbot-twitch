require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
	channels: [process.env.TWITCH_TARGET_CHANNEL],
    identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	}
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME;

    if (isNotBot){
        client.say(channel, `Message ${message} was sent by ${tags.username}`)
    }
	console.log(`${tags['display-name']}: ${message}`);
});