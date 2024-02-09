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
};

// Yeni klavye girişini eklemek için JavaScript kodu
// Kullanıcıdan klavye girişi almak için bir değişken oluşturuyoruz
const userInput = document.getElementById("user-input-section");

// Kullanıcının klavyesinden giriş yapmasını sağlayacak bir fonksiyon oluşturuyoruz
document.addEventListener("keydown", event => {
  // Sadece harf tuşlarına basıldığında işlem yapılmasını sağlıyoruz
  const key = event.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) {
    // Klavyeden girilen harfi ekrana yazdırıyoruz
    userInput.innerHTML += `<span class="inputSpace">${key}</span>`;
    // Klavyeden girilen harfi kontrol et ve işlem yap
    checkLetter(key);
  }
});

// Klavyeden girilen harfi kontrol eden fonksiyon
const checkLetter = (key) => {
  message.innerText = `Correct Letter`;
  message.style.color = "#008000";
  let charArray = randomWord.toUpperCase().split("");
  let inputSpace = document.getElementsByClassName("inputSpace");

  // Eğer array tıklanan değeri içeriyorsa, eşleşen tireyi harfle değiştir
  if (charArray.includes(key)) {
    charArray.forEach((char, index) => {
      // Eğer array'deki karakter tıklanan düğmeyle aynıysa
      if (char === key) {
        // Düğmeyi doğru olarak işaretle
        inputSpace[index].innerText = char;
        // Doğru harfi ekleme sayacını artır
        winCount += 1;
        // Eğer kazanma sayısı kelime uzunluğuna eşitse
        if (winCount == charArray.length) {
          resultText.innerHTML = "You Won";
          startBtn.innerText = "Restart";
          // Tüm düğmeleri engelle
          blocker();
        }
      }
    });
  } else {
    // Kaybetme sayısını azalt
    lossCount -= 1;
    document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
    message.innerText = `Incorrect Letter`;
    message.style.color = "#ff0000";
    if (lossCount == 0) {
      word.innerHTML = `The word was: <span>${randomWord}</span>`;
      resultText.innerHTML = "Game Over";
      blocker();
    }
  }
};

// Sayfa yüklendiğinde oyunu başlat
window.onload = () => {
  init();
};
