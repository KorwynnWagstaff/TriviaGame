$(document).ready(function() {
	var timerCounter = 30;
	var timeoutCounter = 0;
	var correctCounter = 0;
	var incorrectCounter = 0;
	var questionCounter = 0;
	var clock;
	var questions = ["What is lyfe?", "Chicken or the egg?", "How many licks to the center of a Tootsie pop?", "What is lyfe's favorite number?"];
	var answers = [["Money", "Power", "Women", "Family"], ["Chicken", "Egg", "Why do I care", "None"], ["123", "12392", "364", "2"], ["13", "42", "1234321", "NaN"]];
	var correctAnswers = ["D. Family", "A. Chicken", "C. 364", "B. 42"];

	function displayStartBtn() {
		var start = "<button class='btnStart'>Start Trivia Game</button>";
		$("#quizArea").html(start);
	}
	function displayQuestionsAnswers() {
		var questionsAnswersHTML = "<p class='timer-p'>Time Left: <span class='timer'>30</span></p>" + 
		"<p class='question'>" + questions[questionCounter] + "</p>" + 
		"<p class='answer'>A. " + answers[questionCounter][0] + "</p>" + 
		"<p class='answer'>B. " + answers[questionCounter][1] + "</p>" +
		"<p class='answer'>C. " + answers[questionCounter][2] + "</p>" + 
		"<p class='answer'>D. " + answers[questionCounter][3] + "</p>";
		$("#quizArea").html(questionsAnswersHTML);
	}
	function timerWrapper() {
		clock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (timerCounter === 0) {
				clearInterval(clock);
				timeoutLoss();
			}
			if (timerCounter > 0) {
				timerCounter--;
			}
			$(".timer").html(timerCounter);
		}
	}
	function timeoutLoss() {
		timeoutCounter++;
		var timeoutHTML = "<p class='timeout'>Time's up! Next question!</p>"; 
		$("#quizArea").html(timeoutHTML);
		setTimeout(chkQuestionCounter, 3000);
	}
	function correctAnswer() {
		correctCounter++;
		var winHTML = "<p class='correct'>Correct!</p>";
		$("#quizArea").html(winHTML);
		setTimeout(chkQuestionCounter, 3000);
	}
	function incorrectAnswer() {
		incorrectCounter++;
		var loseHTML = "<p class='incorrect'>Incorrect! Correct answer is " + correctAnswers[questionCounter]; + "</p";
		$("#quizArea").html(loseHTML); 
		setTimeout(chkQuestionCounter, 3000);
	}
	function chkQuestionCounter() {
		if (questionCounter < 3) {
			questionCounter++;
			displayQuestionsAnswers();
			timerCounter = 30;
			timerWrapper();
		}
		else {
			displayResetScreen();
		}
	}
	function displayResetScreen() {
		var resetHTML =  "<p class='score'>End of Quiz!</p>" + 
		"<p class='score'>Correct Count: " + correctCounter + "</p>" +
		"<p class='score'>Incorrect Count: " + incorrectCounter + "</p>" +
		"<p class='score'>Unanswered Count: " + timeoutCounter + "</p>" + 
		"<button class='btnReset'>Reset</button>";
		$("#quizArea").html(resetHTML);
	}
	function reset() {
		timerCounter = 30;
		timeoutCounter = 0;
		correctCounter = 0;
		incorrectCounter = 0;
		questionCounter = 0;
		displayQuestionsAnswers();
		timerWrapper();
	}

	displayStartBtn();
	$("body").on("click", ".btnStart", function(event) {
		displayQuestionsAnswers();
		timerWrapper();
	});
	$("body").on("click", ".btnReset", function(event) {
		reset();
	});
	$("body").on("click", ".answer", function(event) {
		pickedAnswer = $(this).text();
		if (pickedAnswer == correctAnswers[questionCounter]) {
			clearInterval(clock);
			correctAnswer();
		}
		else {
			clearInterval(clock);
			incorrectAnswer();
		}
	});
});