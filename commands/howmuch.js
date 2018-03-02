module.exports.run = async (client, message, args) => {
    message.channel.send(message.guild.memberCount);
}

module.exports.help = {
    name: "howmuch",
    usage: "!howmuch",
    descrition: "Send a message containing the amount of people on the Discord Server"

}