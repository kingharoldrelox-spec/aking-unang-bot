const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates // Kailangan ito para sa voice channel
    ]
});

// Taga-gising sa Render
http.createServer((req, res) => {
    res.write("Buhay ang bot mo!");
    res.end();
}).listen(process.env.PORT || 3000);

client.once('ready', () => {
    console.log(`Yown! Online na si ${client.user.tag}!`);
    
    // DITO PAPASOK ANG BOT SA VOICE CHANNEL:
    try {
        joinVoiceChannel({
            channelId: '1520037306579550421', // I-paste dito ang Voice Channel ID
            guildId: '1520037306042417243',    // I-paste dito ang Server ID
            adapterCreator: client.guilds.cache.get('PALITAN_MO_ITO_NG_SERVER_ID').voiceAdapterCreator, // I-paste din dito ang Server ID
        });
        console.log("Nakasok na sa Voice Channel ang Bot!");
    } catch (error) {
        console.error("May mali sa pagpasok sa voice:", error);
    }
});

client.login(process.env.TOKEN);
