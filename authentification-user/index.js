const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// In-memory user database
let users = [];

// SIGN UP: Register a new user
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the "database"
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User signed up successfully!' });
});

// LOGIN: Authenticate the user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

// Optional: GET /signup to provide instructions or form (if needed)
app.get('/signup', (req, res) => {
  res.send('Please use POST /signup with a username and password to register.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
