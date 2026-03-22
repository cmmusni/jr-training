# React TODO App - JSONPlaceholder API Integration

A simple, beginner-friendly React application that demonstrates API integration using the JSONPlaceholder API.

## 🎯 Choose Your Path

### 🚀 [Quick Start Guide](./QUICK_START.md) 
**Just want to run the app?** Get it working in 3 steps (5 minutes).

### 📘 [Complete Tutorial](./TODO_APP_GUIDE.md)
**Want to learn how to build it?** Step-by-step guide with detailed explanations (2-3 hours).

---

## 🎯 Learning Objectives

This project helps you understand:
- React functional components and hooks
- Making API calls (GET, POST, PUT, DELETE)
- State management with useState
- Side effects with useEffect
- Component composition and props
- Conditional rendering
- Event handling

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
react-todo-app/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── TodoList.js     # Component to display list of todos
│   │   ├── TodoList.css    # Styles for TodoList
│   │   ├── TodoItem.js     # Component for individual todo item
│   │   └── TodoItem.css    # Styles for TodoItem
│   ├── App.js              # Main application component
│   ├── App.css             # Styles for App component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## 🔧 Features

- **Fetch Todos**: Load todos from the API
- **Add Todo**: Create a new todo item  
- **Edit Todo**: Change the title of existing todos
- **Toggle Complete**: Mark todos as complete/incomplete
- **Delete Todo**: Remove a todo from the list
- **Loading State**: Shows loading indicator while fetching data
- **Error Handling**: Displays error messages when API calls fail
- **Keyboard Shortcuts**: Press Enter to save edits, Escape to cancel

## 📚 API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/todos?_limit=10` | Fetch list of todos (limited to 10) |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## 💡 Key Concepts Explained

### 1. **useState Hook**
```javascript
const [todos, setTodos] = useState([]);
```
Manages component state. When state changes, component re-renders.

### 2. **useEffect Hook**
```javascript
useEffect(() => {
  fetchTodos();
}, []);
```
Runs side effects. Empty array `[]` means it runs once when component mounts.

### 3. **Async/Await**
```javascript
const response = await fetch(url);
const data = await response.json();
```
Handles asynchronous operations (API calls) in a readable way.

### 4. **Props**
```javascript
<TodoList todos={todos} onToggle={toggleTodo} />
```
Data passed from parent to child components.

## 🎓 Next Steps

Ready to build this yourself? Check out the **[TODO_APP_GUIDE.md](./TODO_APP_GUIDE.md)** for:

- **15 detailed steps** to build the complete app
- **Clear checkpoints** after each step
- **Explanations** of every concept
- **10 practice exercises** to extend your skills
- **Your complete learning path** forward

The guide now includes instructions for adding the **Edit Todo feature**! 🎉

## 📝 Notes

- This app uses JSONPlaceholder, a fake REST API for testing
- API changes are not persisted (they're simulated)
- Perfect for learning and prototyping

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📖 Resources

- [React Documentation](https://react.dev)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
