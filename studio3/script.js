(function () {
  "use strict";
  console.log("reading JS");

  const startGame = document.querySelector("#startgame");
  const gameControl = document.querySelector("#gamecontrol");
  const game = document.querySelector("#game");
  const actions = document.querySelector("#actions");
  const score1 = document.querySelector("#score1");
  const score2 = document.querySelector("#score2");
  const rollSound = document.getElementById("roll-sound");
  const endSound = document.getElementById("end-sound");
  const passSound = document.getElementById("pass-sound");

  const gameData = {
    dice: [
      "images/1die.png",
      "images/2die.png",
      "images/3die.png",
      "images/4die.png",
      "images/5die.png",
      "images/6die.png",
    ],
    players: ["Player 1", "Player 2"],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 30,
  };

  startGame.addEventListener("click", function () {
    gameData.index = Math.round(Math.random());
    console.log(gameData.index);

    gameControl.innerHTML = "<h2>The Game Has Started</h2>";
    gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

    document.getElementById("quit").addEventListener("click", function () {
      location.reload();
    });

    endSound.play();
    setUpTurn();
  });

  function setUpTurn() {
    game.innerHTML = `<p>It's ${gameData.players[gameData.index]}'s turn!</p>`;

    // Show and hide contols depending on player's turn
    if (gameData.index === 0) {
      document.getElementById("roll-again-area1").style.display = "block";
      document.getElementById("pass-area1").style.display = "block";
      document.getElementById("roll-again-area2").style.display = "none";
      document.getElementById("pass-area2").style.display = "none";

      // transparancy
      document.querySelector("#player2 img").classList.add("transparent");
      document.querySelector("#player1 img").classList.remove("transparent");

      // controls
      document
        .getElementById("roll-again-area1")
        .addEventListener("click", rollAgain);
      document.getElementById("pass-area1").addEventListener("click", passTurn);
    } else {
      document.getElementById("roll-again-area1").style.display = "none";
      document.getElementById("pass-area1").style.display = "none";
      document.getElementById("roll-again-area2").style.display = "block";
      document.getElementById("pass-area2").style.display = "block";

      // transparency
      document.querySelector("#player1 img").classList.add("transparent");
      document.querySelector("#player2 img").classList.remove("transparent");

      // controls
      document
        .getElementById("roll-again-area2")
        .addEventListener("click", rollAgain);
      document.getElementById("pass-area2").addEventListener("click", passTurn);
    }
  }

  function passTurn() {
    gameData.index = gameData.index === 0 ? 1 : 0;

    document
      .getElementById("roll-again-area1")
      .removeEventListener("click", rollAgain);
    document
      .getElementById("pass-area1")
      .removeEventListener("click", passTurn);
    document
      .getElementById("roll-again-area2")
      .removeEventListener("click", rollAgain);
    document
      .getElementById("pass-area2")
      .removeEventListener("click", passTurn);

    passSound.play();

    setUpTurn();
  }

  function throwDice() {
    actions.innerHTML = "";
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;

    game.innerHTML = `<p>Roll the dice for ${
      gameData.players[gameData.index]
    }</p>`;
    game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
            <img src="${gameData.dice[gameData.roll2 - 1]}">`;

    gameData.rollSum = gameData.roll1 + gameData.roll2;

    if (gameData.rollSum === 2) {
      game.innerHTML += "<p>Oh snap! Snake eyes!</p>";
      gameData.score[gameData.index] = 0;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      setTimeout(setUpTurn, 2000);
      showCurrentScore();
    } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${
        gameData.players[gameData.index]
      }</p>`;
      setTimeout(setUpTurn, 2000);
    } else {
      gameData.score[gameData.index] += gameData.rollSum;
      checkWinningCondition();
    }
  }

  function rollAgain() {
    rollSound.play();
    throwDice();
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] >= gameData.gameEnd) {
      actions.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${
        gameData.score[gameData.index]
      } points!</h2>`;
      endSound.play();
      document.getElementById("quit").innerHTML = "Start a New Game?";
    } else {
      showCurrentScore();
    }
  }

  function showCurrentScore() {
    score1.textContent = gameData.score[0];
    score2.textContent = gameData.score[1];
  }
})();
