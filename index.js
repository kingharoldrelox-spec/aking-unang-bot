const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Ito ang taga-gising sa bot para hindi matulog sa Render
http.createServer((req, res) => {
    res.write("Buhay ang bot mo!");
    res.end();
}).listen(process.env.PORT || 3000);

client.once('ready', () => {
    console.log(`Yown! Online na si ${client.user.tag}!`);
});

// Kapag may nag-chat ng "ping", sasagot ang bot ng "pong"
client.on('messageCreate', message => {
    if (message.content.toLowerCase() === 'ping') {
        message.reply('pong! 🏓');
    }
});

client.login(process.env.TOKEN);
