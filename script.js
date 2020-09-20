// Initialise Variables
var gameoverEl = false;
var counter;
var interval;
var hscoreOlEl = document.getElementById("hscoreOl");
const beginQuizEl = document.getElementById("start_Quiz-Btn");
const q1ButtonGroupEl = document.getElementById("q1ButtonGroup");
const q2ButtonGroupEl = document.getElementById("q2ButtonGroup");
const q3ButtonGroupEl = document.getElementById("q3ButtonGroup");
const q4ButtonGroupEl = document.getElementById("q4ButtonGroup");
const recordInitialsEl = document.getElementById("button-addon2");
const hScoreBtnGroupEl = document.getElementById("hScroreBtnFGroup");

// Correct answers for all questions
var correctAnswer1 = "Document Object Model";
var correctAnswer2 = "All of the Above";
var correctAnswer3 = "Alerts";
var correctAnswer4 = "Parenthesis";

// Stored highscores array
var highscoreArray = [];

// On load get highscores
getHighScoresFunc();


// When start button is clicked first question appears and timer begins
beginQuizEl.addEventListener("click", function (beginQuiz) {
    document.getElementById("main_screen").style.display = "none";
    document.getElementById("q1").style.display = "block";
    console.log(gameoverEl);
    startQuizTimer(60);

});

// Countdown Timer 
function startQuizTimer(seconds) {
    counter = seconds;
    interval = setInterval(() => {
        counter--;
        document.getElementById("timerdisplay").innerHTML = "Time Remaining: " + counter;
        if (counter < 10 && counter > 0) {
            document.getElementById("timerdisplay").style.color = "red";
        }
        else if (counter < 0) {
            clearInterval(interval);
            gameOverFunc();
        }
    }, 1000);
}


// When a choice is selected in Question 1
function answerQ1(q1Choice) {
    if (q1Choice !== correctAnswer1) {
        document.getElementById("q1outcome").innerHTML = "Incorrect"
        counter -= 10;
        gameOverFunc();

    }
    else {
        document.getElementById("q1outcome").innerHTML = "Correct"
    }
    document.getElementById("q1").style.display = "none";
    document.getElementById("q2").style.display = "block";
}


// When a choice is selected in Question 2
function answerQ2(q2Choice) {
    if (q2Choice !== correctAnswer2) {
        document.getElementById("q2outcome").innerHTML = "Incorrect"
        counter -= 10;
        gameOverFunc();
    }
    else {
        document.getElementById("q2outcome").innerHTML = "Correct"
    }
    document.getElementById("q2").style.display = "none";
    document.getElementById("q3").style.display = "block";
}

// When a choice is selected in Question 3
function answerQ3(q3Choice) {
    if (q3Choice !== correctAnswer3) {
        document.getElementById("q3outcome").innerHTML = "Incorrect"
        counter -= 10;
        gameOverFunc();
    }
    else {
        document.getElementById("q3outcome").innerHTML = "Correct"
    }
    document.getElementById("q3").style.display = "none";
    document.getElementById("q4").style.display = "block";
}

// When a choice is selected in Question 4
function answerQ4(q4Choice) {
    clearInterval(interval);
    if (q4Choice !== correctAnswer4) {
        document.getElementById("q4outcome").innerHTML = "Incorrect"
        counter -= 10;
        gameOverFunc();
    }
    else {
        document.getElementById("q4outcome").innerHTML = "Correct"
    }
    document.getElementById("q4").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("timerdisplay").innerHTML = ""
    document.getElementById("resultsOutcomeScore").innerHTML = "Your Score: " + counter;

}

// When a choice is selected in Quiz Completed
recordInitialsEl.addEventListener("click", function (quizCompleted) {
    quizCompleted.preventDefault();
    document.getElementById("timerdisplay").innerHTML = "";
    var initialsEl = document.getElementById("initalInputField").value;
    var newScoreEntry = {
        initials: initialsEl,
        score: counter
    };

    highscoreArray.push(newScoreEntry);

    saveHighScoresFunc();
    createHighscoreList();

    document.getElementById("initalInputField").value = "";
    document.getElementById("results").style.display = "none";
    document.getElementById("high_scores").style.display = "block";
});

// When a choice is selected in Highscores
function highscorebtn(highscoreChoice) {
    if (highscoreChoice == "Clear Scores") {
        console.log(highscoreChoice);
        window.localStorage.removeItem("highscoresLS");
        highscoreArray = [];
        saveHighScoresFunc();
    }
    document.getElementById("high_scores").style.display = "none";
    document.getElementById("main_screen").style.display = "block";
}


// Save highscores to local storage
function saveHighScoresFunc() {
    localStorage.setItem("highscoresLS", JSON.stringify(highscoreArray));
}

function highscoreNav() {
    createHighscoreList();
    document.getElementById("q1").style.display = "none";
    document.getElementById("q2").style.display = "none";
    document.getElementById("q3").style.display = "none";
    document.getElementById("q4").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("main_screen").style.display = "none";
    document.getElementById("high_scores").style.display = "block";


}

// Create highscore list
function createHighscoreList() {
    hscoreOlEl.innerHTML = "";
    getHighScoresFunc();

    //Sort highscores in ascending order
    var highscoreSortedArray = highscoreArray.sort((a, b) => (a.score > b.score) ? -1 : 1);
    console.log(highscoreArray);

    //Create a new li for each highscore entry
    for (var i = 0; i < highscoreSortedArray.length; i++) {
        var highscoreArrayEntry = highscoreSortedArray[i];
        var liInitialsEl = highscoreArrayEntry.initials;
        var liScoreEl = highscoreArrayEntry.score
        
        console.log(liInitialsEl + " " + liScoreEl);

        var li = document.createElement("li");
        li.textContent = liInitialsEl + " - " + liScoreEl;

        hscoreOlEl.appendChild(li);
    } 
   
}

//Get highscore from local storage
function getHighScoresFunc() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscoresLS"));
    if (storedHighscores !== null) {
        highscoreArray = storedHighscores;
    }
}

//Game Over function runs during quiz if Counter is below 0
function gameOverFunc() {
    if (counter <= 0) {
        document.getElementById("q1").style.display = "none";
        document.getElementById("q2").style.display = "none";
        document.getElementById("q3").style.display = "none";
        document.getElementById("q4").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("timerdisplay").innerHTML = "GAME OVER";
        counter = 0;
        document.getElementById("resultsOutcomeScore").innerHTML = "Your Score: " + counter;
    }
}

