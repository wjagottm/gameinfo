const CharacterController = require('../controllers/character_controller');
const express = require('express');
const router = express.Router();

router.get('/:id', CharacterController.get);
router.get('', CharacterController.getAll);
router.get('/game/:id', CharacterController.getByGame);

module.exports = router;