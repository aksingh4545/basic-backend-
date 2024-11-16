const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Data storage (in-memory)
let items = [];

// Define a route handler for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

// CREATE: Add a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// READ: Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// READ: Get a single item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// UPDATE: Update an item by ID
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.name = req.body.name;
  res.json(item);
});

// DELETE: Remove an item by ID
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
