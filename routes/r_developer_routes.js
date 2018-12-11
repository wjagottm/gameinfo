const DeveloperController = require('../controllers/developer_controller');
const express = require('express');
const router = express.Router();

router.get('/:id', DeveloperController.get);
router.get('', DeveloperController.getAll);

module.exports = router;