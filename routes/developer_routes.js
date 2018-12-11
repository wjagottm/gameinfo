const DeveloperController = require('../controllers/developer_controller');
const express = require('express');
const router = express.Router();

router.post('', DeveloperController.create);
router.post('/game/:id', DeveloperController.addGameToDev);
router.put('/:id', DeveloperController.edit);
router.delete('/:id', DeveloperController.delete);

module.exports = router;