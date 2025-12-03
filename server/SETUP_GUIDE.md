# Mercuri World AI Chat - Complete Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** installed (version 14 or higher) - [Download here](https://nodejs.org/)
- An **OpenAI API account** - [Sign up here](https://platform.openai.com/)
- A **code editor** (VS Code recommended)
- **Terminal/Command Prompt** access

---

## 🚀 Step-by-Step Setup

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer and follow the prompts
4. Verify installation by opening terminal and typing:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Get Your OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in to your account
3. Click on your profile (top right) → "View API Keys"
4. Click **"Create new secret key"**
5. **Copy the key immediately** (you won't be able to see it again!)
6. The key will look like: `sk-...` (starts with "sk-")

**Important:** You'll need to add a payment method to use the API. The costs are very low:
- GPT-3.5-turbo: ~$0.002 per 1000 tokens (very cheap)
- GPT-4: ~$0.03 per 1000 tokens (more expensive but better)

### Step 3: Set Up Your Project

1. **Open Terminal/Command Prompt** in your project folder (where your HTML files are)

2. **Create the backend files** - Save these 4 new files in your project root:
   - `server.js` (the backend server code)
   - `package.json` (Node.js dependencies)
   - `.env.example` (template for environment variables)
   - `.gitignore` (to protect your API key)

3. **Create your .env file**:
   ```bash
   # On Mac/Linux:
   cp .env.example .env
   
   # On Windows:
   copy .env.example .env
   ```

4. **Edit the .env file** and replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   PORT=3000
   ```

### Step 4: Install Dependencies

In your terminal, run:

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Step 5: Start the Server

Run the server with:

```bash
npm start
```

You should see:
```
🚀 Mercuri World server running on http://localhost:3000
📡 API endpoint: http://localhost:3000/api/chat
🔑 OpenAI API Key configured: Yes ✓
```

### Step 6: Test Your Website

1. Open your browser and go to: **http://localhost:3000**
2. Click the **"Open Chat"** button
3. Type a message and press Send
4. The AI should respond!

---

## 🐛 Troubleshooting

### Problem: "node: command not found"
**Solution:** Node.js isn't installed. Go back to Step 1.

### Problem: "OPENAI_API_KEY not configured"
**Solution:** 
- Make sure you created the `.env` file (not `.env.example`)
- Check that your API key is correctly pasted
- Restart the server after editing `.env`

### Problem: "OpenAI API error: 401 Unauthorized"
**Solution:** Your API key is invalid or expired. Generate a new one from OpenAI.

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` again in the project directory.

### Problem: Chat doesn't respond
**Solution:** 
- Check the browser console for errors (F12 → Console tab)
- Check the server terminal for errors
- Make sure the server is running (you should see the 🚀 message)

---

## 📁 Final Project Structure

After setup, your project should look like this:

```
mercuri-world-website/
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── components/
│   ├── footer.html
│   └── navbar.html
├── node_modules/          ← Created by npm install
├── .env                   ← Your API key (DO NOT COMMIT TO GIT!)
├── .env.example          ← Template file
├── .gitignore            ← Protects your API key
├── package.json          ← Dependencies
├── package-lock.json     ← Created by npm install
├── server.js             ← Backend server
├── index.html
├── about.html
├── team.html
├── projects.html
├── blog.html
├── resources.html
├── contact.html
└── README.md
```

---

## 🎯 Next Steps

### For Development:
```bash
# Install nodemon for auto-restart during development
npm install --save-dev nodemon

# Run in development mode (auto-restarts on file changes)
npm run dev
```

### To Customize the AI:
Edit `server.js` and modify the system prompt:
```javascript
{
  role: 'system',
  content: 'Your custom instructions here...'
}
```

### To Deploy Online:
You'll need to deploy both:
1. **Frontend (HTML/CSS/JS)**: Use Netlify, Vercel, or GitHub Pages
2. **Backend (Node.js server)**: Use Heroku, Railway, or Render

---

## 💰 Cost Estimates

Using GPT-3.5-turbo (recommended for cost):
- 100 chat messages ≈ $0.01 - $0.05
- 1,000 messages ≈ $0.10 - $0.50

Set up billing alerts in your OpenAI dashboard to monitor usage!

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] OpenAI account created
- [ ] API key obtained
- [ ] All files created (server.js, package.json, .env, .gitignore)
- [ ] .env file configured with API key
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts successfully (`npm start`)
- [ ] Website accessible at http://localhost:3000
- [ ] AI chat works

---

## 🆘 Need Help?

If you're stuck:
1. Check all error messages carefully
2. Make sure your API key is valid (test it on OpenAI's playground)
3. Verify Node.js version: `node --version` (should be v14+)
4. Check that all files are in the correct location
5. Make sure port 3000 isn't being used by another application

---

**You're all set! 🎉** Your Mercuri World website now has a fully functional AI chat assistant!