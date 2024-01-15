import "./style.css";
import imgBlank from "/src/images/blank.png";
import imgEmpty from "/src/images/white.png";

import cardArray from "./CardArray";
const grid = document.getElementById("grid");
const scoreCounter = document.getElementById("score");
const winScreen = document.createElement("h1");

// sort the array randomly
cardArray.sort(() => 0.5 - Math.random());

let compareArray = [];
let score = 0;

let correctGuess = 0;
scoreCounter.innerHTML = score;
// display cards in the grid element

const populateGameBoard = () => {
  cardArray.forEach((item, index) => {
    const card = document.createElement("img");
    // fill the card with a blank
    card.src = imgBlank;
    card.setAttribute("key", index);
    card.setAttribute("name", item.name);
    card.addEventListener("click", () => {
      // on click switch blank to actual image
      card.src = item.img;
      // push the clicked item to the compareArray
      compareArray.push({ ...item, key: index });
      // if there are two items to compare, compare them and reset the array
      if (compareArray.length === 2) {
        // check if the same tile has been clicked twice
        if (compareArray[0].key === compareArray[1].key) {
          alert("Please, do not click the same tile twice");
          compareArray.pop();
          return;
        }
        let isGuessed = false;
        isGuessed = compareItems(compareArray[0].name, compareArray[1].name);
        // if items match, turn image to white, and remove event listener
        if (isGuessed) {
          switchImage(compareArray);
          score = score += 3;
          correctGuess += 1;
          scoreCounter.innerHTML = score;
          if (correctGuess === cardArray.length / 2) {
            winScreen.innerHTML = "You've done it! Your score was: " + score;
            grid.innerHTML = "";
            grid.appendChild(winScreen);
          }
        }
        if (!isGuessed) {
          restoreBlank(compareArray);
          if (score > 0) {
            score -= 1;
            scoreCounter.innerHTML = score;
          }
        }

        compareArray = [];
      }
    });
    grid.appendChild(card);
  });
};
populateGameBoard();

const compareItems = (item1, item2) => {
  if (item1 === item2) return true;
  return false;
};

const restoreBlank = (arr) => {
  const thisArr = arr;
  thisArr.forEach((item) => {
    // query selector follows css rules for strings
    const key = String(item.key);
    const clickedCard = document.querySelector(`img[key="${key}"]`);
    // let the images linger on the screen
    setTimeout(() => {
      clickedCard.src = imgBlank;
    }, 500);
  });
};

const switchImage = (arr) => {
  arr.forEach((item) => {
    const key = String(item.key);
    const clickedCard = document.querySelector(`img[key="${key}"]`);
    setTimeout(() => {
      clickedCard.src = imgEmpty;
      // remove event listener by cloning the node
      clickedCard.replaceWith(clickedCard.cloneNode(true));
    }, 200);
  });
};
