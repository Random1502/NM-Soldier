module.exports.run = async (client, message, args) => {
    message.channel.send("```The available are: !avatar, !help, !howmuch, !live, !ping ```");
}

module.exports.help = {
    name: "help",
    description: "Shows the avaiable commands"
}