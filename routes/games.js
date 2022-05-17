const express = require('express');
const { Socket } = require('socket.io');
const router = express.Router();
const queries = require('../db/queries/index');
const auth = require('../middlewares/auth');

/* POST Create */
router.post('/', auth, async (req, res, next) => {
  try {
    const { name, numberOfPlayers = parseInt(req.body.number_of_players, 10) } =
      req.body;
    if (!name || !numberOfPlayers || numberOfPlayers < 2 || numberOfPlayers > 4)
      return res
        .status(400)
        .json({ error: 'Missing/Incorrect name or numberOfPlayers' });

    console.log('Number of players =======', numberOfPlayers);
    let game = await queries.Games.create({
      name,
      set_number_of_players: numberOfPlayers,
      admin_id: req.user.id,
    });
    console.log('CREATED GAME ====', game);
    game = await queries.Games.addUserToGame(game.id, req.user.id);

    const io = req.app.get('socketio');
    io.emit('UPDATE_GAME_LIST', { game: game });

    return res.status(201).json(game);
  } catch (error) {
    next(error);
  }
});

/* POST Join */
router.post('/:gameId', auth, async (req, res, next) => {
  try {
    const { gameId } = req.params;
    if (!gameId) return res.status(400).json({ error: 'Missing gameId' });
    const game = await queries.Games.addUserToGame(gameId, req.user.id);
    return res.status(201).json(game);
  } catch (error) {
    next(error);
  }
});

/* GET All */
router.get('/', auth, async (req, res, next) => {
  try {
    const games = await queries.Games.findAll();

    const io = req.app.get('socketio');
    io.emit('hi!', 'hi!!');

    return res.status(200).json(games);
  } catch (error) {
    next(error);
  }
});

/* GET One */
router.get('/:id', auth, async (req, res, next) => {
  try {
    const game = await queries.Games.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    return res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

/* POST Start game */
router.post('/:id/start', auth, async (req, res, next) => {
  try {
    console.log('EJ ASPEPSEPSPPSESPEPSPSEPEPS EPSPES', req.params);
    const { id } = req.params;
    const game = await queries.Games.findById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (game.admin_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updatedGame = await queries.Games.startGame(id);
    let gameCards = await queries.Games.initGameCards(id);
    const playersGame = await queries.Games.findPlayersInGame(id);
    // console.log('PLAYERS GAME ===', playersGame);
    for (const player of playersGame) {
      // Assign 7 gameCards to player
      const playerGameCards = await queries.Cards.playerDraw(
        id,
        player.user_id,
        7,
        gameCards
      );
      // console.log('PLAYER GAME CARDS ===', playerGameCards);
      // const socket = req.app.get('socketio').sockets.connected[player.id];
      // socket.emit('START_GAME', { game: updatedGame });
    }
    gameCards = await queries.Cards.getAllCardsOfGame(id);
    console.log('GAME CARDS ===', gameCards);
    const cardsOfUser = await queries.Cards.getAllCardsOfGameUser(
      req.user.id,
      id
    );
    return res.status(200).json({ game: updatedGame, cards: cardsOfUser });
    // const io = req.app.get('socketio');
    // io.emit('UPDATE_GAME_LIST', { game: updatedGame });
    // return res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
});

/* POST Play card(s) */
router.post('/:id/play', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cardsId } = req.body;
    const gameCards = await queries.Cards.getAllCardsOfGame(id);
    const game = await queries.Games.findById(id);
    const userCards = await queries.Cards.getAllCardsOfGameUser(
      req.user.id,
      id
    );
    console.log('User cards =======', userCards);
    console.log('Game cards  =======', gameCards);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (!cardsId || !Array.isArray(cardsId) || cardsId.length === 0) {
      return res.status(400).json({ error: 'Missing cardsId' });
    }
    userCards.forEach((userCard) => {
      if (!cardsId.includes(userCard.id)) {
        return res.status(400).json({ error: 'Missing cardsId' });
      }
    });
  } catch (error) {
    next(error);
  }
});

/* UPDATE One */
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gameState } = req.body;
    // const game = await queries.Games.update(gameState, req.user);
    // const cards = await queries.Games.getAllCardsOfGame(id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
