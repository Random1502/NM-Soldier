const moment = module.require('moment');

module.exports.run = async (client, message, args) => {
    const ping = Math.round(client.ping);
    message.channel.send(`ping \`${ping} ms\``).then(msg => {
        msg.delete(10000);
    });
}

module.exports.help = {
    name: "ping",
    usage: "!ping",
    descrition: "Returns the latency of the bot to the server"
}
