var command = process.argv[2];
var command2 = process.argv[3];

// the imdb request
var request = require("request");
if (!command2) {
    var movieInput = "Mr. Nobody";
} else {
    var movieInput = command2;
}

var url = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy"

function movieCall() {
    request(url, function (error, response, body) {


        if (!error && response.statusCode === 200) {
            var parsed = JSON.parse(body);
            console.log("Movie Title");
            console.log(parsed.Title);
            console.log("Movie Year");
            console.log(parsed.Year);
            console.log("IMDB Rating");
            console.log(parsed.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating");
            console.log(parsed.Ratings[1].Value);
            console.log("Movie Country");
            console.log(parsed.Country);
            console.log("Movie Language");
            console.log(parsed.Language);
            console.log("Movie Plot");
            console.log(parsed.Plot);
            console.log("Movie Actors");
            console.log(parsed.Actors);
        }
    });

}
// movieCall();
// the spotify request

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "23e41a94491c43cd98f4001bd9316d3e",
    secret: "ef19d2284ea24f43b6d1b6c7a9adec74"
});
if (!command2) {
    var spotifyInput = "The Sign";
} else {
    var spotifyInput = command2;
}
var spotifyInput = "" + spotifyInput + "";

function spotifyCall() {
    spotify
        .search({
            type: 'track',
            query: spotifyInput
        })
        .then(function (response) {
            var artistNames = response.tracks.items[0].artists;
            console.log("The Artists");
            for (let i = 0; i < artistNames.length; i++) {
                console.log(artistNames[i].name);
            }
            console.log("The Song Name");
            console.log(response.tracks.items[0].name);
            console.log("The Preview Url");
            console.log(response.tracks.items[0].preview_url);
            console.log("The Album Name");
            console.log(response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log(err);
        });

};
//   spotifyCall();
//   twitter call

var Twitter = require("twitter");
var keys = require("./keys.js");

var client = new Twitter(keys);
var params = {
    screen_name: "bob_ba_bob"
};

function twitterCall() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log("Another Tweet");
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }

        }
    });
}
var fs = require("fs");

function doWhat() {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(error);
        }
        var split = data.split(",");
        spotifyInput = split[1];
        spotifyCall();
    });
}
// twitterCall();
// switch statements
switch (command) {
    case "spotify-this-song":
        spotifyCall();
        break;
    case "my-tweets":
        twitterCall();
        break;
    case "movie-this":
        movieCall();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}