const express = require('express');
const router = express.Router();
const nameController = require('../controllers/name');

router.get('/random', nameController.getRandomNames);

module.exports = router;
