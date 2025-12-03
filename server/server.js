// server.js - Backend server for Mercuri World AI Chat
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('.')); // Serve static files from root directory

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint - handles AI chat requests
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // You can change to 'gpt-4' for better responses
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for Mercuri World, a neuroscience and innovation club. You help answer questions about neuroscience, cognitive science, the club activities, and provide educational support. Be friendly, informative, and encouraging. Keep responses concise but informative.'
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ 
        error: 'OpenAI API error', 
        details: errorData.error?.message 
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Return AI response
    res.json({ message: aiMessage });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, `${page}.html`));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mercuri World server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔑 OpenAI API Key configured: ${process.env.OPENAI_API_KEY ? 'Yes ✓' : 'No ✗'}`);
});