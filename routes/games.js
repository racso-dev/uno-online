const express = require('express');
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
    io.emit(JSON.stringify(
      {
        type: 'UPDATE_GAME_LIST',
        payload: game,
      }
    ));

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

module.exports = router;
