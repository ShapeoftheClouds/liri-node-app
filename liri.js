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

// function movies (myMovies) {
//     //console.log("movieName:", movieName);
//     var queryUrl = "http://www.omdbapi.com/?t=" + myMovies + 
//                    "&y=&plot=short&tomatoes=true&apikey=c494508d";
//     console.log(queryUrl);
//     request(queryUrl, function (error, response, body) {
//           //console.log('body:', body);
//           if ((error === null) && (response.statusCode === 200)) {
//             var data =  JSON.parse(body);
//             //console.log(data);
//             console.log('---------------------------');
//             console.log(' ');
//             console.log('Title of Movie: ' + data.Title);
//             writeToLogFile('\nTitle of Movie: ' + data.Title);
//             console.log('Year Released: ' + data.Year);
//             writeToLogFile('\nYear Released: ' + data.Year);
//             console.log('Rating: ' + data.Rated);
//             writeToLogFile('\nRating: ' + data.Rated);
//             console.log('Country where produced: ' + data.Country);
//             writeToLogFile('\nCountry where produced: ' + data.Country);
//             console.log('Language: ' + data.Language);
//             writeToLogFile('\nLanguage: ' + data.Language);
//             console.log('Plot: ' + data.Plot);
//             writeToLogFile('\nPlot: ' + data.Plot);
//             console.log('Actors: ' + data.Actors);
//             writeToLogFile('\nActors: ' + data.Actors);
//             console.log('Rotten Tomatoes URL: ' + data.tomatoURL);
//             writeToLogFile('\nRotten Tomatoes URL: ' + data.tomatoURL);
//             console.log(' ');
//             console.log('---------------------------');
//           } 
//         }
// });
// }

function movies() {
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var index = 2; index < nodeArgs.length; index++) {
  if (index > 2 && index < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[index];
  }
  else {
    movieName += nodeArgs[index];
  }
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=c494508d";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);
request(queryUrl, function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});
}

	// request("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=c494508", function(error, response, body) {
 //  // If the request is successful (i.e. if the response status code is 200)
 //    	var data = JSON.parse(body);
 //  	  	console.log("What's being read?");
 //  	  	console.log(data.Title);
  	// var movieTitle = [];
  	// var movieReleaseDate = [];
  	// var movieRating = [];
  	// var countryProduced = [];
  	// var movieLanguage = [];
  	// var moviePlot = [];
  	// var movieActors = [];
  	// var rottenTomatoes = [];
    // console.log("The movie's rating is: " + data.Title);
   //   * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.
   // * Rotten Tomatoes URL.
// });

// }