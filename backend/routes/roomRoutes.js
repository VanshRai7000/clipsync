const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomControllers.js');

router.post('/create', roomController.createRoom);

module.exports = router;
