console.log("Starting Application...")

// define global variables
var timer;
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var chosenQuestion;
var questionAnswers;



var audio = new Audio("assets/music/Roman-empire-main-theme.mp3");


// Create an array of objects that includes all the questions, answers, and the "correct" answer (index of answers array)
var response = [
        {
        question: "Which greek king was a student of Aristotle?",
        answers: ["King Phillip II of Macedon", "Cassander", "Alexander the Great", "Julius Caesar"],
        correct: 2,
        name: "Alexander the Great",
        picture: "assets/images/Alexander-the-Great.jpg",   
    }, {
        question: "At which battle did the King Leonidas and 300 Spartans fight Xerxes I of Persia?",
        answers: ["The Battle of Platea", "The Battle of Red Cliffs", "The Siege of Ogrimmar", "The Battle of Thermoplyae"],
        correct: 3,
        name: "The Battle of Thermoplyae",
        picture: "assets/images/Thermopylae.jpg",
    }, {
        question: "Who wrote 'The Art of War'?",
        answers: ["Trajan", "Napolean Bonaparte", "Sun Tzu", "Homer"],
        correct: 2,
        name: "Sun Tzu",
        picture: "assets/images/Sun-Tzu.jpeg",
    }, {
        question: "Who was the last pharaoh of Egypt?",
        answers: ["King Tut", "Cleopatra VII", "Amenhotep III", "Ptolemy XII"],
        correct: 1,
        name: "Cleopatra VII",
        picture: "assets/images/Cleopatra.jpg"
    }, {
        question: "This Roman wonder was constructed to house gladiatorial contests and other public spectacles.",
        answers: ["The Aquaduct", "The Colosseum", "The Basilica", "The Phalanx"],
        correct: 1,
        name: "The Colosseum",
        picture: "assets/images/Colosseum.jpg",
    }, {
        question: "Who was known as the last of the 'Five Good Emperers' of the Roman Empire?",
        answers: ["Marcus Aurelius", "Commodus", "Julius Caesar", "Maximus Decimus Meridius"],
        correct: 0,
        name: "Marcus Aurelius",
        picture: "assets/images/Marcus-Aurelius.jpg",
    }, {
        question: "Who was responsible for bringing England into what is known as 'The Golden Age'?",
        answers: ["Queen Elizabeth I", "Henry Tutor VIII", "Lucius Artorius Castus (King Arthur)", "Jane Seymour"],
        correct: 0,
        name: "Queen Elizabeth I",
        picture: "assets/images/Queen-Elizabeth.jpg",
    }, {
        question: "Who created the largest Empire in the world (Pre-British Empire)?",
        answers: ["Alexander the Great", "Genghis Khan", "Sargon of Akkad", "Julius Caesar"],
        correct: 1,
        name: "Genghis Khan",
        picture: "assets/images/Genghis-Khan.jpg",
    }, {
        question: "Who created the 'Julian Calendar' composed of 365 days and 1 leap day every four years?",
        answers: ["Plato", "Augustus", "Julius Caesar", "Julius Augustus Tiberious"],
        correct: 2,
        name: "Julius Caesar",
        picture: "assets/images/Julius-Caesar.jpg",
    }, {
        question: "Who was a Roman slave and gladiator that lead a vast and bloody revolt against the Roman Empire?",
        answers: ["Spartacus", "Nero", "Maximus Decimus Meridius", "William Wallace"],
        correct: 0,
        name: "Spartacus",
        picture: "assets/images/Spartacus.png",
    }
    
]
// Call them with chaining test============
console.log(response);
// console.log(response[3].question);
// console.log("-------------------");
// console.log(response[4].answers[1]);


playMusic = function () {

    $(".start-btn").on("click", function()  {

        audio.play();
    });
}

pauseMusic = function () {

    $(".stop-btn").on("click", function() {

        audio.pause();
    });
}
 
$(document).ready(function () {
    playMusic();
    pauseMusic();
    
    startGame();
});

// create a function that selects a random question from the response array
chosenQuestion = function () {
 
    // Grab a ranodom question 
   randomQuestion = Math.floor(Math.random()*response.length);

    // grab the randomQuestion string with chaining
   selectedQuestion = response[randomQuestion].question

   
    // console.log(chosenQuestion);
    drawQuestion();
    // drawAnswers();
}

chosenAnswers = function () {

    // chosenQuestion();
    questionAnswers = response[randomQuestion].answers;
    // console.log(questionAnswers);
    drawAnswers();
}


// create a function that will draw the questions into the #question on the DOM
drawQuestion = function () {

    // update the #questions with the chosenQuestion
    $("#questions").append(selectedQuestion);
    
}

drawAnswers = function () {

    
    // create a for loop that cycles through the chosenAnswers array
    for (var i = 0; i < questionAnswers.length; i ++) {

        // create a variable to house the question answers and connect it to the DOM
        answers = $("<div>"); 

        // link the answers with the answers style
        answers.addClass("answers");

        // link the answers with the html
        answers.html(questionAnswers[i]);

        // get the value of the answers by using data-
        answers.attr("data-indexvalue", i);

        // update the answers with the value and draw them to DOM at the #answers div
        $("#answers").append(answers);

        
        // console.log("data-indexvalue", i);
    }
}

// create a start function with a button
    // clicking the start button should then display the questions and answers and set the timer

startGame = function () {

    $(".startgame-btn").on("click", function()  {
        hideDirections();
        hideStartButton();
        startTimer();
        chosenQuestion();
        chosenAnswers();
        
    });
}

// create a function to hide the directions
hideDirections = function () {

    $("#directions").hide();
}

// create a function to hide the start button
hideStartButton = function () {

    $("#start").hide();
}

// Create a function that starts the timer
startTimer = function () {
    // Set timer to 30 seconds
    timer = 30
    // set the timer to DECREASE by 1 Second
    intervalId = setInterval(decrement, 1000);
}

// Create a function to Stop the timer
stopTimer =function () {
    
    clearInterval(intervalId);
}

// Create a function to display the timer and count down
// if timer runs out
    // lose condition and display image
function decrement() {

    //  Decrease the timer by 1 sec.
    timer--;

    //  Show the timer in the #timer on the DOM 
    $("#timer").html("<h1>" + "Time Left: " + timer + "</h1>");


    //  Once number hits zero...
    if (timer === 0) {

      //  stop the timer
      stopTimer();

    //   increase the incorrectAnswers
        incorrectAnswers++

        // Tell user they were wrong
    $("#questions").html("<p>Sorry, but you ran out of time. The correct answer was " + response[randomQuestion].name + ".</p>");
      
        // Draw picture
        drawPicture();
    }
  }

// Create a function that will show the picture on the win/lose condition
// must replace the #answer
// set a timeout for the picture

drawPicture = function () {

    // get the picture that is associated with the correct answer via chaining
    $("#answers").html("<img src=" + response[randomQuestion].picture + ">");

    // create a setTimeout function to only display the image for a specific amount of time...
    setTimeout(function () {

        // clear the question display
        $("#questions").empty();

        // clear the answer display
        $("#answers").empty();
        
        // if the game is over just display the results
        if (incorrectAnswers + correctAnswers === response.length) {
            
            $("#questions").html("Game Over! Here's your results: ");
            $("#questions").append("<p>Number Correct: " + correctAnswers +"</p>");
            $("#questions").append("<p>Number Wrong: " + incorrectAnswers + "</p>");

            // else draw a new question and answers and reset the the timer
        } else {
            
            chosenQuestion();
            chosenAnswers();
            startTimer();
        }

        // display the image for 4 seconds
    }, 1000 * 4);
    
}

// create a reset button

// CONTROLS===========================================================
// ===================================================================

// Create on click function for user to choose an answer
$(document).on('click', '.answers', function () {

    
    // grab the users answer by using "THIS" and collect the data-
   var userAnswer = ($(this).attr("data-indexvalue"));

   userAnswer = parseInt(userAnswer);


    // // If the user selects the correct answer...
    if (userAnswer === response[randomQuestion].correct) {

    //     // stop the timer
        stopTimer();

    //     // update answers correctAnswers
        correctAnswers++

    //     // alert correct
        $("#questions").html("<p>Correct! The answer is " + response[randomQuestion].answers[userAnswer] + "! Great job!</p>");

   
    //     // draw a new question
        drawPicture();
       
    }

    else {

    //     // stop the timer
        stopTimer();

    //     // update incorrectAnswers
        incorrectAnswers++

    //     // alert incorrect
        $("#questions").html("<p>Sorry, but the correct answer is " + response[randomQuestion].name + ".</p>");

        
    //     // draw a new question
        drawPicture();
      
    }
});