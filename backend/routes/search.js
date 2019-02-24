const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search');


router.get('/:name', SearchController.searchName);

module.exports = router;
