const moment = module.require('moment');
const Discord = module.require('discord.js');

module.exports.run = async (client, message, args) => {
    const ping = Math.round(client.ping);
    message.channel.send(`ping \`${ping} ms\``)
}

module.exports.help = {
    name: "ping",
    usage: "!ping",
    descrition: "Returns the latency of the bot to the server"

}