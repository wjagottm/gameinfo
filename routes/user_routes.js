const userController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;