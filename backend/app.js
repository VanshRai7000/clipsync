// const express = require('express');
// const app = express();
// const roomRoutes = require('./routes/roomRoutes');

// app.use(express.json());
// app.use('/api/rooms', roomRoutes);

// module.exports = app;


const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

module.exports = app;

