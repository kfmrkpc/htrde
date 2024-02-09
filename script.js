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

//Function to check if letter exists in word and reveal it
const revealLetter = (letter) => {
  const charArray = randomWord.toUpperCase().split("");
  const inputSpaces = document.getElementsByClassName("inputSpace");

  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === letter) {
      // If the letter is found in the word and hasn't been revealed yet
      if (inputSpaces[i].innerText === "_ ") {
        inputSpaces[i].innerText = charArray[i];
        winCount++;

        if (winCount === charArray.length) {
          resultText.innerHTML = "You Won";
          startBtn.innerText = "Restart";
          blocker();
        }

        return true; // Letter found and revealed
      }
    }
  }

  return false; // Letter not found or already revealed
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

      if (revealLetter(clickedLetter)) {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
      } else {
        button.classList.add("incorrect");
        lossCount--;
        document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";

        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }

      button.disabled = true; //Disable clicked button
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
