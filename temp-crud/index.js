const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON bodies from POST requests

let user; 

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// POST /user to create a new user
app.post('/user', (req, res) => {
  const { name } = req.body;
  user = { name }; 
  res.status(201).json(user); 
});

// GET /user to retrieve the user data
app.get('/user', (req, res) => {
  res.json(user);
});

// Optional: GET /items as an alias for retrieving the user data
app.get('/items', (req, res) => {
  res.json(user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
