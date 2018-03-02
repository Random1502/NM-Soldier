// Constants
const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require('fs');
const moment = require('moment');
//const request = require('snekfetch');

// Config stuff
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const token = config.token;
const prefix = config.prefix;

// Event listener to check when the bot is ready
client.on("ready", () => {
    console.log(`${client.user.username} is ready to serve`);
    client.user.setActivity("Serving");
});

client.commands = new Discord.Collection();
// Reads the directory /commands
fs.readdir("./commands", (err, files) => {
    // If there is an error YOU typed the directory name wrong!
    if(err) console.error(err);

    /*
        Looks at each file in the directory for the .js extension and puts it in an array[name, extension]
        Example: "ping.js" ["test", "js"]
    */
    let jsfiles = files.filter(f =>f.split(".").pop() === "js");
    // If there are 0 files in the directory sends a message to console
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }
    // Just a message showing that the command files are loading
    console.log(`Loading ${jsfiles.length} commands!`);
    // Does a loop to check for every .js file in the directory
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
            // console.log(`${i + 1}: ${f} loaded!`);  Use this if you want to see each command being loaded
        client.commands.set(props.help.name, props);
    });
    console.log(`${jsfiles.length} commands are loaded!`);
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