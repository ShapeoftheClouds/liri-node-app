#Liri Bot

A Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI sends requests to Twitter, Spotify and OMDB APIs. It returns my latest tweets.

LIRI takes in one of the following commands:
my-tweets
spotify-this-song
movie-this
do-what-it-says

To use:
* Run your terminal/bash window.
* Run node liri.js my-tweets
* This will show my last 20 tweets and when they were created in your terminal/bash window.

* Run node liri.js spotify-this-song 'song name here'
* This will show the following information about the song in your terminal/bash window:
  1. Artist(s)
  2. The song's name
  3. A preview link of the song from Spotify
  4. The album that the song is from

*  Run node liri.js movie-this 'movie name here'
* This will output the following information to your terminal/bash window:
  1. Title of the movie.
  2. Year the movie came out.
  3. IMDB Rating of the movie.
  4. Country where the movie was produced.
  5. Language of the movie.
  6. Plot of the movie.
  7. Actors in the movie.
  8. Rotten Tomatoes URL.

* Run node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
