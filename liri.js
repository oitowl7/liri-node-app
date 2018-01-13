var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var nodeSpotifyApi = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var omdbKey = "trilogy";

var userInput = process.argv;

//function runs if user uses "my-tweets function"
if (userInput[2] === "my-tweets") {
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
			if (!error) {
				console.log("\n\n")
				for (var i = tweets.length - 1; i >= 0; i--) {
					console.log(tweets[i].text);
					console.log(tweets[i].created_at + "\n");
				}
			}
		})
	})
}