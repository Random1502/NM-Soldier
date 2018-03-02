// Constants
const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require('fs');
const moment = require('moment');
//const request = require('snekfetch');

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    /*
        Read to the directory and makes an array for all of the files
        Example: "test.hello.js" ["test", "hello", "js"]
    */
    let jsfiles = files.filter(f =>f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
            console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
    });
});

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
    if (message.channel.type == "DM") return;

    var mess = message.content;    
    let messageArray = mess.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // Checks if the message starts with the prefix
    if(!mess.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length).toLowerCase());

    if(cmd) cmd.run(client, message, args);
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