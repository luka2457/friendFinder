var friends = require("../data/friends");
var officeCharacters = require("../data/officeCharacters");

module.exports = function (app) {
    // Displays all characters
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.get("/api/officeCharacters", function (req, res) {
        return res.json(officeCharacters);
    });

    // Create New Characters - takes in JSON input
    app.post("/api/friends", function (req, res) {
        // create object to store best match
        var bestMatch = {
            name: "",
            photo: "",
            matchDifference: 1000
        }

        // holds the user posted data
        var userData = req.body;
        var userScores = userData.scores;

        //difference score between user and characters score
        var totalDifference = 0;

        // loop thru each character in the officeCharacters object
        for (i = 0; i < officeCharacters.length; i++) {

            totalDifference = 0;

            // next loop through each score in friends[i], and com pare them...
            // to userData scores and calc the absolute difference.
            for (j = 0; j < officeCharacters[i].scores.length; j++) {

                // calculate total score
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(officeCharacters[i].scores[j]));

            }

            // checks if friend[i]'s totalDifference is less than the bestFriend,... 
            // ...friend difference, if so, it becomes the new best match
            console.log("Character Name: ", officeCharacters[i].name, "Total Score: ", totalDifference);

            if (totalDifference <= bestMatch.matchDifference) {
                // sets bestFriend variables to best match
                bestMatch.name = officeCharacters[i].name;
                bestMatch.photo = officeCharacters[i].photo;
                bestMatch.matchDifference = totalDifference;

                console.log("Best match: " + bestMatch.name +  "\n" + "Matchscore: " + totalDifference);

            } else {
                // character is not the best match.
                console.log(officeCharacters[i].name + " is not the best match\n")
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
};

