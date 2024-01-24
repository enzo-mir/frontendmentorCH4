const rulesDetails = document.querySelector(".rulesDetail");
const rulesSide = document.querySelector(".rulesSide");
const gameContainer = document.querySelector(".gameContainer");
const chooser = document.getElementById("chooser");
const iaChoos = document.getElementById("iaChoos");
const choices = document.querySelectorAll("#chooser div");
const scorePoints = document.querySelector(
  "header .scoreContainer p:last-child"
);

const main = document.querySelector("main");

const h2IaChoice = iaChoos.querySelector("h2");
const spanIaChoice = iaChoos.querySelector("span");

function toggleDetails() {
  rulesDetails.getAttribute("data-show") == "false"
    ? rulesDetails.setAttribute("data-show", "true")
    : rulesDetails.setAttribute("data-show", "false");
}

let tableChoice = ["rock", "paper", "scissors"];
let coopChoice = "";

for (let index = 0; index < choices.length; index++) {
  const choice = choices[index];
  choice.addEventListener("click", (e) => {
    choice.style.pointerEvents = "none";
    choice.setAttribute("data-selected", "true");
    coopChoice = choice.getAttribute("id");

    setTimeout(() => {
      chooser.style.animation = "gameStart .5s ease-in-out forwards";
      chooser.style.backgroundPositionX = "-400px";

      choice.prepend(document.createElement("h2"));

      const h2 = chooser.querySelector("h2");

      h2.innerHTML = "YOU PICKED";

      iaChoos.style.opacity = "1";
      h2IaChoice.style.opacity = "1";
    }, 300);

    let iaChoice = tableChoice[~~(Math.random() * tableChoice.length)];

    iaChoos.classList.add(`${iaChoice}`);

    let iaImageChoose = iaChoos.appendChild(document.createElement("img"));
    iaImageChoose.setAttribute("src", `./images/icon-${iaChoice}.svg`);

    setTimeout(() => {
      iaImageChoose.style.opacity = "1";
      spanIaChoice.style.backgroundColor = "rgba(255, 255, 255, 1)";
    }, 1500);

    choices.forEach((element) => {
      element.hasAttribute("data-selected")
        ? ""
        : element.setAttribute("data-selected", "false");
    });
    chooser.addEventListener(
      "animationend",
      () => {
        setTimeout(() => {
          gameResult(choice.getAttribute("id"), iaChoos.getAttribute("class"));
          iaChoos.style.transform = "translateX(125%)";

          chooser.style.animation = "gameRes .5s ease-in-out forwards";
        }, 1500);
      },
      { once: true }
    );
  });
}

function gameResult(coop, ia) {
  var finalResult;

  if (
    (coop == "scissors" && ia == "paper") ||
    (coop == "rock" && ia == "scissors") ||
    (coop == "paper" && ia == "rock")
  ) {
    finalResult = "YOU WIN";
    scorePoints.innerHTML = parseInt(scorePoints.innerHTML) + 1;
  } else if (coop == ia) {
    finalResult = "DRAW !";
  } else {
    finalResult = "YOU LOOS";
  }

  let playAgainDiv = document.createElement("div");
  playAgainDiv.setAttribute("id", "playAgain");
  main.prepend(playAgainDiv);
  const playAgain = document.getElementById("playAgain");

  let winnerIsDiv = document.createElement("div");
  winnerIsDiv.setAttribute("id", "winnerIs");
  gameContainer.prepend(winnerIsDiv);
  const winnerIs = document.getElementById("winnerIs");

  setTimeout(() => {
    if (finalResult == "YOU WIN") {
      winnerIs.style.left = `${
        chooser.querySelector("div[data-selected=true]").getBoundingClientRect()
          .x -
        winnerIs.offsetWidth / 2 +
        parseInt(window.getComputedStyle(document.body)["padding"]) * 2
      }px`;
    } else if (finalResult == "YOU LOOS") {
      winnerIs.style.left = `${
        iaChoos.getBoundingClientRect().x -
        winnerIs.offsetWidth / 2 +
        iaChoos.offsetWidth / 2 -
        parseInt(window.getComputedStyle(document.body)["padding"])
      }px`;
    } else {
      winnerIs.style.left = "50%";
      winnerIs.style.transform = "translateX(-50%)";
    }

    playAgain.innerHTML = `
  <h1>${finalResult}</h1>
  <button>PLAY AGAIN</button>
  `;

    const btnRestartGame = document.querySelector("#playAgain button");
    setTimeout(() => {
      btnRestartGame.style.pointerEvents = "auto";
    }, 500);

    playAgain.style.opacity = "1";

    setTimeout(() => {
      winnerIs.style.opacity = "1";
    }, 500);
  }, 500);
}

function restartGame() {
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      choice.style.pointerEvents = "none";

      setTimeout(() => {
        const btnRestartGame = document.querySelector("#playAgain button");

        btnRestartGame.addEventListener("click", (e) => {
          chooser.style.animation = "";
          chooser.style.transform = "translateX(50%)";
          chooser.style.backgroundPositionX = "0px";
          choice.removeChild(main.querySelector("#chooser div:has(h2) h2"));

          iaChoos.removeAttribute("style");
          const iaImageChoose = document.querySelector(
            "main .gameContainer #iaChoos img"
          );
          iaChoos.removeAttribute("class");
          spanIaChoice.removeAttribute("style");
          h2IaChoice.removeAttribute("style");

          const winnerIs = document.getElementById("winnerIs");
          winnerIs.style.opacity = "0";

          const playAgain = document.getElementById("playAgain");
          playAgain.style.opacity = "0";

          setTimeout(() => {
            iaChoos.removeChild(iaImageChoose);
            gameContainer.removeChild(winnerIs);
            main.removeChild(playAgain);
          }, 500);

          for (let i = 0; i < choices.length; i++) {
            choices[i].removeAttribute("data-selected");
            choices[i].style.pointerEvents = "none";
            setTimeout(() => {
              choices[i].style.pointerEvents = "auto";
            }, 2000);
          }
        });
      }, 3000);
    });
  });
}
restartGame();
