const express = require('express');
const router = express.Router();
const nameController = require('../controllers/name');

router.get('/random', nameController.getRandomNames);
router.get('/randomFull', nameController.getRandomFullNames);

module.exports = router;
