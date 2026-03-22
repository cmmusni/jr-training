# 🚀 Quick Start Guide

Want to get the app running quickly? Follow these 3 simple steps!

## Step 1: Install Dependencies

Open your terminal in this project folder and run:

```bash
npm install
```

**What this does:** Downloads all the required packages (React, etc.) needed to run the app.

**How long:** 1-3 minutes depending on your internet speed.

---

## Step 2: Start the Development Server

After installation completes, run:

```bash
npm start
```

**What this does:** Starts the React development server and opens your app in a browser.

**Expected result:** 
- Terminal shows "Compiled successfully!"
- Browser opens automatically to http://localhost:3000
- You see the TODO app with 10 todos loaded

---

## Step 3: Try the Features!

### ✅ Toggle Completion
Click the checkbox next to any todo to mark it complete/incomplete.

### ✏️ Edit a Todo
1. Click the orange "Edit" button
2. Change the text in the input field
3. Press Enter or click "Save"
4. Press Escape or click "Cancel" to discard changes

### 🗑️ Delete a Todo
Click the red "Delete" button to remove a todo.

### ➕ Add a New Todo
1. Click "Add New Todo" button
2. Type your todo title in the prompt
3. Click OK
4. Your new todo appears at the top!

### 🔄 Reload Todos
Click "Reload Todos" to fetch fresh data from the API.

---

## 🎓 Want to Learn How It Works?

Check out the [TODO_APP_GUIDE.md](./TODO_APP_GUIDE.md) file for a complete step-by-step tutorial on building this app from scratch!

---

## 🐛 Troubleshooting

### "Command not found: npm"
You need to install Node.js first. Download it from [nodejs.org](https://nodejs.org/)

### "Port 3000 is already in use"
Another app is using port 3000. Either:
- Stop that app
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### "Module not found" errors
Run `npm install` again to reinstall dependencies.

### App won't load todos
- Check your internet connection
- The API (jsonplaceholder.typicode.com) might be down (rare)
- Check the browser console for error messages (F12)

---

## 📝 Project Structure

```
src/
├── App.js              ← Main component with all logic
├── App.css             ← Styling for main component
├── index.js            ← Entry point
├── index.css           ← Global styles
└── components/
    ├── TodoList.js     ← Displays list of todos
    ├── TodoList.css    ← List styling
    ├── TodoItem.js     ← Individual todo item
    └── TodoItem.css    ← Item styling
```

---

## 🎯 What's Next?

1. **Read the full guide** - [TODO_APP_GUIDE.md](./TODO_APP_GUIDE.md)
2. **Experiment** - Try changing colors, text, or behavior
3. **Add features** - Follow the exercises in the guide
4. **Build your own** - Create a new app from scratch

Happy coding! 🚀
