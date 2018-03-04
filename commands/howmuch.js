module.exports.run = async (client, message, args) => {
    message.channel.send("There are " +message.guild.memberCount + " members in the server");
}

module.exports.help = {
    name: "howmuch",
    usage: "!howmuch",
    descrition: "Send a message containing the amount of people on the Discord Server"

}