module.exports.run = async (client, message, args) => {
    message.channel.fetchMessages()
        .then(function(list){
            message.channel.bulkDelete(list);
        });
}

module.exports.help = {
    name: "purge",
    usage: "!purge <# of messages you want to delete>",
    description: "Deletes the amount of messages specified(default 1)"
}