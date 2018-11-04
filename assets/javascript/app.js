var config = {
    apiKey: "AIzaSyB70Nl2Pf1T4_pdCEwJ_0-OSAqc2TAVKjA",
    authDomain: "rps-multiplayer-fbe45.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fbe45.firebaseio.com",
    projectId: "rps-multiplayer-fbe45",
    storageBucket: "",
    messagingSenderId: "451595685329"
};
firebase.initializeApp(config);

var playerTurn = firebase.database().ref();

var players = firebase.database().ref("/players");

var player1 = firebase.database().ref("/players/player1");

var player2 = firebase.database().ref("/players/player2");

var playerChat = firebase.database().ref("/chat");

var player;

var p1Snap;

var p2Snap;

var p1result;

var p2result;

var p1 = null;

var p2 = null;

var wins1 = 0;

var wins2 = 0;

var losses1 = 0;

var losses2 = 0;

var playerNum = 0;

$("#playerInfo").html("<input id=playerName type=text placeholder='Enter your name to begin'><input id=enterPlayer type=submit value=Start>");

player1.on("value", function(snapshot) {
	if (snapshot.val() !== null) {
		p1 = snapshot.val().player;
		wins1 = snapshot.val().wins;
		losses1 = snapshot.val().losses;
		$("#p1name").html("<h2>" + p1 + "</h2>");
		$("#p1stats").html("<p>Wins: " + wins1 + "  Losses: " + losses1 + "</p>");
	} 
	else {
		$("#p1name").html("Waiting for Player 1");
		$("#p1stats").empty();
		
		if (p1 !== null) {
			playerChat.push({
				player: p1,
				taunt: " has disconnected",
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		};
	};
}, 
player2.on("value", function(snapshot) {
	if (snapshot.val() !== null) {
		p2 = snapshot.val().player;
		wins2 = snapshot.val().wins;
		losses = snapshot.val().losses;
		$("#p2name").html("<h2>" + p2 + "</h2>");
		$("#p2stats").html("<p>Wins: " + wins2 + "  Losses: " + losses2 + "</p>");
	} 
	else {
		$("#p2name").html("Waiting for Player 2");
		$("#p2stats").empty();
	
		if (p2 !== null) {
			playerChat.push({
				player: p2,
				taunt: " has disconnected",
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		};
	};
},

$("#enterPlayer").on("click", function() {
	event.preventDefault();
	player = $("#playerName").val().trim();
	player1.once("value", function(snapshot) {
		p1Snap = snapshot;
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	player2.once("value", function(snapshot) {
		p2Snap = snapshot;
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	if (!p1Snap.exists()) {
		
		playerNum = 1;
		
		player1.onDisconnect().remove();
		
		player1.set({
			player: player,
			wins: 0,
			losses: 0
		});
		$("#playerInfo").html("Hi " + player + "! You are Player 1");
		
		if (!p2Snap.exists()) {
			$("#playerTurn").html("Waiting for Player 2 to join...");
		};
	} 
	else if (!p2Snap.exists()) {
		
		playerNum = 2;
		
		player2.onDisconnect().remove();
		
		player2.set({
			player: player,
			wins: 0,
			losses: 0
		});
		
		playerTurn.update({
			turn: 1
		});
		$("#playerInfo").html("Hi " + player + "! You are Player 2");
		$("#playerTurn").html("Waiting for " + p1 + " to choose.");
	
	} 
	else {
		$("#playerInfo").html("Sorry. Two people are already playing");
	};
})));
var rpsResults = function() {
	
	player1.once("value", function(snapshot) {
		p1result = snapshot;
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	player2.once("value", function(snapshot) {
		p2result = snapshot;
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	if (p1result.val() !== null && p2result.val() !== null) {
		
		if (p1result.val().choice == p2result.val().choice) {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>Tie Game!</h1>");
		
		} 
		else if (p1result.val().choice == "Rock" && p2result.val().choice == "Scissors") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p1 + " wins!</h1>");
			wins1++;
			losses2++;
		
		} 
		else if (p1result.val().choice == "Rock" && p2result.val().choice == "Paper") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p2 + " wins!</h1>");
			wins2++;
			losses1++;
		
		} 
		else if (p1result.val().choice == "Paper" && p2result.val().choice == "Scissors") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p2 + " wins!</h1>");
			wins2++;
			losses1++;
		
		} 
		else if (p1result.val().choice == "Paper" && p2result.val().choice == "Rock") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p1 + " wins!</h1>");
			wins1++;
			losses2++;
		
		} 
		else if (p1result.val().choice == "Scissors" && p2result.val().choice == "Paper") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p1 + " wins!</h1>");
			wins1++;
			losses2++;
		
		} 
		else if (p1result.val().choice == "Scissors" && p2result.val().choice == "Rock") {
			$("#p1choices").html("<br><br><br><h1>" + p1result.val().choice + "</h1>");
			$("#p2choices").html("<br><br><br><h1>" + p2result.val().choice + "</h1>");
			$("#results").html("<br><br><br><br><br><h1>" + p2 + " wins!</h1>");
			wins2++;
			losses1++;
		};
		setTimeout(function() {
			playerTurn.update({
				turn: 1
			});
			player1.once("value", function(snapshot) {
				p1result = snapshot;
			});
			if (p1result.val() !== null) {
				player1.update({
					wins: wins1,
					losses: losses1
				});
			};
			player2.once("value", function(snapshot) {
				p2result = snapshot;
			});
			if (p2result.val() !== null) {
				player2.update({
					wins: wins2,
					losses: losses2
				});
			};
			$("#results").html("");
			$("#p2choices").html("");
			$("#player2").css("border-color", "black");
			}, 1000*4);
	};
};
playerTurn.on("value", function(snapshot) {
	if (snapshot.val() !== null) {
		if (snapshot.val().turn == 1 && playerNum == 1) {
			$("#p1choices").empty();
			$("#p1choices").append("<div>Rock</div>");
			$("#p1choices").append("<div>Paper</div>");
			$("#p1choices").append("<div>Scissors</div>");
			$("#playerTurn").html("It's your turn!");
		
		} 
		else if (snapshot.val().turn == 2 && playerNum == 2) {
			$("#p2choices").empty();
			$("#p2choices").append("<div>Rock</div>");
			$("#p2choices").append("<div>Paper</div>");
			$("#p2choices").append("<div>Scissors</div>");
			$("#playerTurn").html("It's your turn!");
		
		} 
		else if (snapshot.val().turn == 3) {
			$("#playerTurn").html("");
			rpsResults();
		};
	};
});
$("#p1choices").on("click", "div", function() {
	var choice = $(this).text();
	$("#p1choices").html("<br><br><br><h1>" + choice + "</h1>");
	setTimeout(function() {
		playerTurn.update({
			turn: 2
		});
		player1.update({
			choice: choice
		}); 
	}, 500);
});
$("#p2choices").on("click", "div", function() {
	var choice = $(this).text();
	$("#p2choices").html("<br><br><br><h1>" + choice + "</h1>");
	setTimeout(function() {
		player2.update({
			choice: choice
		}); 
		playerTurn.update({
			turn: 3
		});
	}, 500);
});