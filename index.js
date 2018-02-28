// Constants
const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require('fs');
const moment = require('moment');

// Config stuff
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const token = config.token;
const prefix = config.prefix;

// Event listener to check if the bot loads up
client.on("ready", () => {
    console.log("Suh dude!");
});

// Commands
client.on("message", message => {
    // Checks if message isn't written by a bot. If not then it runs
    if (message.author.bot == true) return;

    var mess = message.content;    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Checks if the message starts with the prefix
    if(mess.startsWith(prefix)) {

        switch (command) {
            // Diplays the latency from the bot
            case "ping" :
                const ping = Math.round(client.ping);
                message.channel.send(`ping \`${ping} ms\``);
                break;
            // Displays the amount of people there are in the server
            case "howmuch" :
                message.channel.send(message.guild.memberCount);
                break;
            }
    } else {
        return message.channel.send("Use the prefix '" + prefix + "'");
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    var channel = member.guild.channels.find("name","welcome");
    if(!channel) {
        console.log("Channel not found!");
    } else {
    channel.send(`Welcome ${member}`);
    }
});

// Create an event listener for leaving guild members
client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    var channel = member.guild.channels.find("name","welcome");
    if(!channel){
        console.log("Channel not found");
    } else {
    channel.send(`Bye ${member}`);
    }
});


client.login(token);
