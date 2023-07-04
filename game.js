let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = false;
let buttonColours = ["red", "blue", "green", "yellow"];

// Starts the game with a keypress on the document
$(document).on("keypress", function () {
	if (started != true) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// decides a sequence which the user needs to follow
function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	let randomNumber = Math.round(Math.random() * 3);
	let randomChosenColour = buttonColours[randomNumber];
	let selectedButton = "#" + randomChosenColour;
	gamePattern.push(randomChosenColour);
	$(selectedButton).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

// user pressed gets implemented and goes to checkAnswer function
$(".btn").on("click", function (event) {
	let userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

// button pressed
function animatePress(currentColor) {
	let activeButton = $("#" + currentColor);
	activeButton.addClass("pressed");
	setTimeout(function () {
		activeButton.removeClass("pressed");
	}, 100);
}

// check the user answer
function checkAnswer(currentLevel) {
	let userAnswer = userClickedPattern[currentLevel];
	if (userAnswer === gamePattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.toString() === gamePattern.toString()) {
			setTimeout(nextSequence, 1000);
		}
	} else {
		let wrong = new Audio("sounds/wrong.mp3");
		wrong.play();
		$("#level-title").text("Game Over, Press Any Key to Restart");
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

// Restart Game
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

// sound function
function playSound(name) {
	switch (name) {
		case "red":
			let red = new Audio("sounds/red.mp3");
			red.play();
			break;
		case "blue":
			let blue = new Audio("sounds/blue.mp3");
			blue.play();
			break;
		case "green":
			let green = new Audio("sounds/green.mp3");
			green.play();
			break;
		case "yellow":
			let yellow = new Audio("sounds/yellow.mp3");
			yellow.play();
			break;
		default:
			console.log(name);
			break;
	}
}
