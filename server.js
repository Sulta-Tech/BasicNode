import express from 'express';
import session from 'express-session';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong, unique secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Sample route to demonstrate session usage
app.post('/chat', (req, res) => {
  const { message } = req.body;

  // Initialize user session if it doesn't exist
  if (!req.session.chatHistory) {
    req.session.chatHistory = [];
  }

  // Store the message in session
  req.session.chatHistory.push(message);

  res.json({
    message: 'Message received',
    chatHistory: req.session.chatHistory
  });
});

// Route to retrieve chat history
app.get('/chat/history', (req, res) => {
  res.json({
    chatHistory: req.session.chatHistory || []
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
