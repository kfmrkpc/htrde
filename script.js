//Word and Hints Object
const options = {
  aroma: "Pleasing smell",
  pepper: "Salt's partner",
  halt: "put a stop to",
  jump: "Rise suddenly ",
  shuffle: "Mix cards up ",
  combine: "Add; Mix",
  chaos: "Total disorder",
  labyrinth: "Maze",
  disturb: "Interrupt; upset ",
  shift: "Move; Period of word",
  machine: "Device or appliance",
};

//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

//Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};

//Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  //Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

//Function to check if word is guessed correctly
const checkWord = () => {
  const userInput = userInpSection.innerText.replace(/\s/g, "").toUpperCase();
  if (userInput === randomWord.toUpperCase()) {
    resultText.innerHTML = "You Won";
    startBtn.innerText = "Restart";
    blocker();
  } else {
    lossCount--;
    document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
    message.innerText = `Incorrect Guess`;
    message.style.color = "#ff0000";

    if (lossCount == 0) {
      word.innerHTML = `The word was: <span>${randomWord}</span>`;
      resultText.innerHTML = "Game Over";
      blocker();
    }
  }
};

//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    //Character button onclick
    button.addEventListener("click", () => {
      const clickedLetter = button.innerText;
      button.disabled = true; //Disable clicked button
      button.classList.add("clicked");

      message.innerText = `Selected Letter: ${clickedLetter}`;
      message.style.color = "#000";
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

//Check Word Button onclick
checkWordBtn.addEventListener("click", () => {
  checkWord();
});

window.onload = () => {
  init();
};
