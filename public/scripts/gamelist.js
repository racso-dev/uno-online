const gameList = document.getElementById("game-list");

const initGameDiv = (game) => {
  const gameDiv = document.createElement("div");
  gameDiv.classList.add("lobby-list-item");
  gameDiv.classList.add("border");
  //   gameDiv.setAttribute('data-game-id', game.id);
  gameDiv.innerHTML = `${game.name}`;
  gameDiv.addEventListener("click", () => {
    fetch("/games/" + game.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    }).then((res) => res.json()).then((data) => {
      console.log(data);
    });
    // redirect to /lobby
    window.location.href = "/lobby";
  });
  return gameDiv;
};

window.addEventListener("load", async (event) => {
  console.log("Bearer ::====", window.localStorage.getItem("token"));
  const games = await fetch("/games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  }).then((data) => data.json());
  console.log("GAMMESS ++===========^=^=^=^^=^^=", games);
  for (const game in games) {
    console.log("GAME $$$$$$$$$$=======", game);
    gameList.appendChild(initGameDiv(games[game]));
  }
});

const initSocketIO = async () => {
  const socket = io();
  socket.on("connect", () => {
    console.log("client side socket connection established");
    socket.on("hi!", (message) => {
      console.log(message);
    });

    socket.on("UPDATE_GAME_LIST", (message) => {
      // console.log("game list updated !!!!!!!!!!!!!!" );
      // console.log(message)
      gameList.appendChild(initGameDiv(message.game));
    });
  });
};

initSocketIO();
