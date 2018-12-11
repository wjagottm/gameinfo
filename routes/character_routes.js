const CharacterController = require('../controllers/character_controller');
const express = require('express');
const router = express.Router();

router.post('', CharacterController.create);
router.put('/:id', CharacterController.edit);
router.delete('/:id', CharacterController.delete);

module.exports = router;