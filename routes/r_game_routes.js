const GameController = require('../controllers/game_controller');
const express = require('express');
const router = express.Router();

router.get('/:id', GameController.get);
router.get('', GameController.getAll);
router.get('/developer/:id', GameController.getByDev);

module.exports = router;