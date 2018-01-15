var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var nodeSpotifyApi = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var omdbKey = "trilogy";

//antiquated by inquirer...but may be useful for later stuff
var userInputOld = process.argv;
var userInput = "";

//function runs if user uses "my-tweets function"


var myTweets = function() {
	//questions that are asked in inquirer.prompt
	var question = [
		{
			type: "input",
			name: "username",
			message: "What is the name of the user you'd like to see tweets for? (default: fakieaccountjs)"
		},
		{
			type: "input",
			name: "count",
			message: "How many would you like to see? (default: 20)",
			//validates that the count is a number greater than 0 unless it is !input
			validate: function(input) {
				if (isNaN(input)){
					console.log("\nSelect a number")
					return false;
				} else {
					if (input > 0) {
						return true;
					} else if (!input) {
						return true;
					} else {
						console.log("\nPlease make the number greater than 0");
						return false;
					}
				}
			}
		}
	]
	//inquirer runs the questions and runs answers function
	inquirer.prompt(question).then((answers) => {
		var username;
		var count;
		//input validation to use either the inputted values or the default
		if (answers.username) {
			username = answers.username;
		} else {
			username = "fakeieaccountjs";
		}
		if (answers.count) {
			count = parseInt(answers.count);
		} else {
			count = 20;
		}
		//object with the paramaters in the format twitter client needs
		var params = {screen_name: username, count: count};
		//twitter get function (client.get(path, params, function(error, tweets, response)))
		client.get("statuses/user_timeline", params, function(error, tweets, response){
			if (error) {
				console.log("\nThere was an error");
				openingQuestion();
			} else {
				console.log("\n\n")
				for (var i = tweets.length - 1; i >= 0; i--) {
					console.log(tweets[i].text);
					console.log(tweets[i].created_at + "\n");
				}
				console.log("____________________________________\n");
				openingQuestion();
			}
		})
	})
}

var spotifyThisSong = function(randomSong) {
	var song = randomSong;
	var questions = [
		{
			type: "input",
			message: "What song would you like to hear?",
			name: "trackName",
			validate: function(input){
				if (input){
					return true;
				} else {
					console.log("\nPlease enter something");
					return false;
				}
			}
		},
		{
			type: "input",
			message: "Who is the artist?",
			name: "trackArtist",
			validate: function(input){
				if (input){
					return true;
				} else {
					console.log("\nPlease enter something");
					return false;
				}
			}			
		}
	]
	//if randomSong got passed, this does not run as the name of the song has already been given and there is no need for a prompt
	if (!randomSong){
		inquirer.prompt(questions).then((answers) => {
			song = answers.trackName + " " + answers.trackArtist;

			spotify.search({type: "track", query: song}, function(err, data){
				// console.log(err);
				if (!err) {
					// console.log(data.tracks.items[0]);
					console.log("\n____________________________________");
					console.log("Artist: " + data.tracks.items[0].artists[0].name);
					console.log("Track: " + data.tracks.items[0].name);
					console.log("Album: " + data.tracks.items[0].album.name);
					console.log("Link: " + data.tracks.items[0].preview_url)
					console.log("____________________________________\n");
					openingQuestion();
				}
			})
		})
		//else runs if the random song was passed from the previous function
	} else {
		spotify.search({type: "track", query: song}, function(err, data){
				// console.log(err);
				if (!err) {
					// console.log(data.tracks.items[0]);
					console.log("\n____________________________________");
					console.log("Artist: " + data.tracks.items[0].artists[0].name);
					console.log("Track: " + data.tracks.items[0].name);
					console.log("Album: " + data.tracks.items[0].album.name);
					console.log("Link: " + data.tracks.items[0].preview_url)
					console.log("____________________________________\n");
					openingQuestion();
				}
			})
	}
}

//movie information is given from omdb using "request"
var movieThis = function(movie) {
	//question prompt to ask what movie the person wants to see
	var questions = [
		{
			type: "input",
			message: "What movie would you like the name of?",
			name: "name",
			validate: function(input){
				if (input){
					return true;
				} else {
					console.log("Please Enter Something. The movie \" \" doesn't exist");
				}
			}
		}
	]
	//prompt to ask the question and then request the object from omdb if no movie got passed
	if (!movie) {
		inquirer.prompt(questions).then((answers) => {
			// console.log(answers);
			var movieName = answers.name;
			var searchTerm= movieName.split(' ').join('+');
			var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchTerm;
			request.get(url, (error, response, body) => {
				// console.log(error);
				// console.log(body);
				var bodyObject = JSON.parse(body);
				// console.log(bodyObject);

				console.log("\n____________________________________");
				console.log("Title: " + bodyObject.Title);
				console.log("Year: " + bodyObject.Year);
				console.log("IMDB Rating: " + bodyObject.Ratings[0].Value);
				console.log("Rotton Tomatoes Rating: " + bodyObject.Ratings[1].Value);
				console.log("Country of Production: " + bodyObject.Country);
				console.log("Language: " + bodyObject.Language);
				console.log("Plot Summary: " + bodyObject.Plot);
				console.log("Actors: " + bodyObject.Actors);
				console.log("Director: " + bodyObject.Director)
				console.log("____________________________________\n");
				openingQuestion();
			})
		})

	} else {
		var movieName = movie;
		var searchTerm= movieName.split(' ').join('+');
		var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + searchTerm;
		request.get(url, (error, response, body) => {
			// console.log(error);
			console.log(body);
			console.log(JSON.stringify(body.Title));

			// console.log("Title: " + body.Title);
			// console.log("Year: " + body.Year);
			// console.log("IMDB Rating: " + body.Ratings);
			// console.log("Rotton Tomatoes Rating: " + body.Ratings);
			// console.log("Country of Production: " + body.Country);
			// console.log("Language: " + body.Language);
			// console.log("Plot Summary: " + body.Plot);
			// console.log("Actors: " + body.Actors);
			// console.log("Director: " + body.Director)
			openingQuestion();
		})
	}
}
//weird function that takes the data from the random.txt and then runs the function from the first part and searches for the second part
var randomThingy = function(){
	fs.readFile("./random.txt", "utf8", (err, data) => {
		// console.log(data);
		var partOne = data.split(",");
		// console.log(partOne);
		if (partOne[0] === "spotifyThisSong"){
			spotifyThisSong(partOne[1]);
		} else if (partOne[0] === "movieThis"){
			movieThis(partOne[1]);
		} else {
			console.log("This isn't something I can do\n")
			openingQuestion();
		}
	})

}




var startingQuestion = [
	{
		type: "list",
		choices: ["View tweets", "Spotify a song", "Movie information", "Run function and search from random.txt"],
		message: "Whatcha Wanna Do?",
		name: "selection"
	}
]
var openingQuestion = function(){
	console.log("\n");
	inquirer.prompt(startingQuestion).then((answers) => {
		if (answers.selection === "View tweets") {
			myTweets();
		} else if (answers.selection === "Spotify a song") {
			spotifyThisSong();
		} else if(answers.selection === "Movie information") {
			movieThis();
		} else {
			randomThingy();
		}
	})
}
openingQuestion();