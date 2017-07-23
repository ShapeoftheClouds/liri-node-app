var Twitter = require('twitter');
var keysJS = require("./keys.js");
var keys = keysJS.twitterKeys;

var action = process.argv[2];

// A switch statement that will direct which function gets run.
switch (action) {
	case "my-tweets":
	twitter();
	break;

	case "spotify-this-song":
	break;

	case "movie-this":
	break;

	case "do-what-it-says":
	break;
}

// Function pulling tweets from twitter
function twitter() {
var client = new Twitter(keys);
var params = {screen_name: 'ShapeoftheCloud', count: 20}; 
client.get('statuses/user_timeline.json', params, function(error, tweets, response) {

for (index = 0; index < tweets.length; index++) {
	var myTweets = tweets[index].text;
	console.log(myTweets);
} 

});
}