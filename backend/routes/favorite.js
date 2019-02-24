const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/favorite');
const checkAuth = require('../middleware/checkAuth');

router.post('/assign', checkAuth, LikeController.assignLike);
router.get('/', checkAuth, LikeController.getLikes);

module.exports = router;
