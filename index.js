const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Taga-gising sa Render para hindi matulog ang bot
http.createServer((req, res) => {
    res.write("Buhay ang bot mo!");
    res.end();
}).listen(process.env.PORT || 3000);

client.once('ready', () => {
    console.log(`Yown! Online na si ${client.user.tag}!`);
    
    // Dito ko na inilagay ang mga ID mo:
    try {
        joinVoiceChannel({
            channelId: '1520037306579550421', // Ang Channel ID mo
            guildId: '1520037306042417243',    // Ang Server ID mo
            adapterCreator: client.guilds.cache.get('1520037306042417243').voiceAdapterCreator,
        });
        console.log("Nakasok na sa Voice Channel ang Bot!");
    } catch (error) {
        console.error("May mali sa pagpasok sa voice:", error);
    }
});

client.login(process.env.TOKEN);
