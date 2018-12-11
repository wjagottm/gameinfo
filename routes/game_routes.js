const GameController = require('../controllers/game_controller');
const express = require('express');
const router = express.Router();

router.post('', GameController.create);
router.post('/character/:id', GameController.addCharToGame);
router.put('/:id', GameController.edit);
router.delete('/:id', GameController.delete);

module.exports = router;