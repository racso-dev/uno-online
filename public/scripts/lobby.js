// Deck filling order besides player deck since the player's deck will always be
// the first and at the bottom

const fillOrderList = [
  "topDeck",
  "leftDeck",
  "rightDeck",
];

const fillOrder = {
  "topDeck": "top-deck",
  "leftDeck": "left-deck",
  "rightDeck": "right-deck",
};

const domElements = {
  playerDeck: document.getElementById("player-deck"),
  topDeck: document.getElementById("top-deck"),
  leftDeck: document.getElementById("left-deck"),
  rightDeck: document.getElementById("right-deck"),
};

const lastPlayedCard = document.getElementById("last-played-card");

class Decks {
  constructor(gameState) {
    this.gameState = gameState;
  }

  buildPlayerDeck() {
    // Remove all cards in the player's deck first
    while (domElements.playerDeck.firstChild) {
      domElements.playerDeck.removeChild(domElements.playerDeck.firstChild);
    }
    // Then add the new cards
    for (let i = 0; i < this.gameState.playerDeck.length; i++) {
      const cardElement = document.createElement("div");
      cardElement.classList.add(
        "card",
        `num-${this.gameState.playerDeck[i].value}`,
        this.gameState.playerDeck[i].color,
      );
      cardElement.innerHTML = `<span class="inner"><span class="mark">${
        this.gameState.playerDeck[i].value
      }</span></span>`;
      domElements.playerDeck.appendChild(cardElement);
    }
  }

  buildOtherPlayerDecks() {
    while (domElements.topDeck.firstChild) {
      domElements.topDeck.removeChild(domElements.topDeck.firstChild);
    }
    while (domElements.leftDeck.firstChild) {
      domElements.leftDeck.removeChild(domElements.leftDeck.firstChild);
    }
    while (domElements.rightDeck.firstChild) {
      domElements.rightDeck.removeChild(domElements.rightDeck.firstChild);
    }
    for (let i = 0; i < this.gameState.otherPlayers.length; i++) {
      for (let j = 0; j < this.gameState.otherPlayers[i]; j++) {
        const tag = document.createElement("div");
        tag.classList.add("card", "back");
        tag.innerHTML =
          `<span class="inner"><span class="back-mark">UNO</span></span>`;
        domElements[fillOrderList[i]].appendChild(tag);
      }
    }
  }

  placeLastPlayedCard() {
    lastPlayedCard.classList = "";
    lastPlayedCard.classList.add(
      "card",
      `num-${this.gameState.lastPlayed.value}`,
      this.gameState.lastPlayed.color,
    );
    lastPlayedCard.firstElementChild.firstElementChild.innerHTML =
      this.gameState.lastPlayed.value;
  }
}

window.addEventListener("load", async () => {
  // TODO: fetch base game state here. In the meantime, just hardcode it.
  const gameState = {
    lastPlayed: { color: "blue", value: "8" },
    playerDeck: [
      { color: "blue", value: "7" },
      { color: "green", value: "1" },
      { color: "red", value: "3" },
      { color: "yellow", value: "5" },
      { color: "blue", value: "6" },
    ],
    otherPlayers: [
      // the numbers here define the number of cards an opponent has in their deck
      3,
      5,
    ],
  };
  const decks = new Decks(gameState);
  decks.placeLastPlayedCard();
  decks.buildPlayerDeck();
  decks.buildOtherPlayerDecks();
});
