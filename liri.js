var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keysJS = require("./keys.js");
var keys = keysJS.twitterKeys;

var action = process.argv[2];
var userInput = process.argv[3];
var movieInput = process.argv[4];

// A switch statement that will direct which function gets run.
switch (action) {
	case "my-tweets":
	twitter();
	break;

	case "spotify-this-song":
	spotify();
	break;

	case "movie-this":
	movies();
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
			var dateOfTweets = tweets[index].created_at;
			console.log(myTweets + " " + dateOfTweets);
		} 
	});
}

function spotify() {
	// Spotify ID information
	var spotify = new Spotify({
		id: '3d1cb5ea2a7841b3933a709258e7bc95',
		secret: 'd5835839885c4422b94bd82d0dd8f238'
	}); 

	spotify.search({ type: 'track', query: userInput }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		var items = data.tracks.items;

		for (index = 0; index < items.length; index++) {

			var trackName = items[index].name;
			var previewUrl = items[index].preview_url;
			var albumName = items[index].album.name;
			var artistName = items[index].artists[0].name;

			console.log("Artist Name: " + artistName);
			console.log("Song Name: " + trackName);
			console.log("Preview Link: " + previewUrl);
			console.log("Album Name: " + albumName);
		} 
	});
}

function movies() {
	var movieInput = process.argv[3];
	var queryUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
		if (movieInput !== "undefined" && !error && response.statusCode === 200) {
			var body = JSON.parse(body);
			console.log("Movie Title: " + body.Title);
			console.log("Movie Release Year: " + body.Year);
			console.log("Movie Country was Produced: " + body.Country);
			console.log("Language of movie: " + body.Language);
			console.log("Movie Plot: " + body.Plot);
			console.log("Movie Actors: " + body.Actors);
			console.log("Rotten Tomatoes URL: " + body.tomatoURL);
		} else {
			console.log("ERROR!");
		}
	});
}