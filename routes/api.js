// routes/api.js
const express = require('express');
const router = express.Router();

// Sample data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Helper function for finding item by ID
const findItemById = (id) => items.find(i => i.id === parseInt(id));



// GET: Retrieve all items
router.get('/items', (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Retrieve a single item by ID
router.get('/items/:id', (req, res) => {
  try {
    const item = findItemById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST: Add a new item
router.post('/items', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newItem = {
      id: items.length + 1,
      name: name
    };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT: Update an existing item
router.put('/items/:id', (req, res) => {
  try {
    const item = findItemById(req.params.id);
    const { name } = req.body;

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required to update the item' });
    }

    item.name = name;
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE: Remove an item
router.delete('/items/:id', (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
