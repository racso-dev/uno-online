const gameList = document.getElementById('game-list');

const initGameDiv = (game) => {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('lobby-list-item');
  gameDiv.classList.add('border');
  //   gameDiv.setAttribute('data-game-id', game.id);
  gameDiv.innerHTML = `${game.name}`;
  return gameDiv;
};

window.addEventListener('load', async (event) => {
  console.log('Bearer ::====', window.localStorage.getItem('token'));
  const games = await fetch('http://localhost:3000/games', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  }).then((data) => data.json());
  console.log('GAMMESS ++===========^=^=^=^^=^^=', games);
  for (const game in games) {
    console.log('GAME $$$$$$$$$$=======', game);
    gameList.appendChild(initGameDiv(games[game]));
  }
  // const form = event.currentTarget;
  // const url = form.action;

  try {
    // const formData = new FormData(form);
    // const plainFormData = Object.fromEntries(formData.entries());
    // const formDataJsonString = JSON.stringify(plainFormData);
    // console.log(formDataJsonString);
    // console.log(`Bearer ${window.localStorage.getItem('token')}`);
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: window.localStorage.getItem('token'),
    //   },
    //   body: formDataJsonString,
    // })
    //   .then((data) => data.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
});
