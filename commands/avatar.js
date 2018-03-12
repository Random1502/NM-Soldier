module.exports.run = async (client, message, args) => {
    let msg = await message.channel.send("Generating avatar...");
    let target = message.mentions.users.first() || message.author;

    await message.channel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar.gif"
        }
    ]});
    msg.delete();
}

module.exports.help = {
    name: "avatar",
    usage: "!avatar [USER MENTION OR ID]",
    description: "Show the user/mentioned user's avatar picture"
}