const express = require('express');
const server = express();
const gamesRouter = require('../games/games-router.js');
server.use(express.json());

server.use('/games', gamesRouter)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;