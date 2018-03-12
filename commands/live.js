const snekfetch = require('snekfetch');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const api = "https://api.twitch.tv/kraken/streams/"+ config.streamer +"?client_id=" + config.twitchid;

module.exports.run = async (client, message, args) => {
    // Does a GET request for the api which is registered at the top
    snekfetch.get(api).then(r => {
        var json = r.body;
        var live = json.stream.channel.status;

        // Checks if the streamer is live
        if(json.stream == null){
            // If not does nothing
            console.log('offline');
        } else {
            // Otherwise it send the title of the stream
            message.channel.send(live);
        }
    });
}

module.exports.help = {
    name: "json"
}