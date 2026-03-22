# 📘 Step-by-Step Guide: Building a TODO App with React and JSONPlaceholder API

This guide will walk you through building a simple TODO application using React and the JSONPlaceholder API. Perfect for beginners!

## 📋 Table of Contents

1. [Adding Edit Todo Feature](#adding-edit-todo-feature)
2. [Exercises for Practice](#exercises-for-practice)

---

## Adding Edit Todo Feature

Now let's add the ability to edit todo titles! This is a common feature in TODO apps.

### Step 11: Update TodoItem to Support Editing

**What you'll do:** Add edit mode, input field, and save/cancel buttons to TodoItem.

**File: `src/components/TodoItem.js`** - Replace the entire file with:

```javascript
import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track the edited title
  const [editedTitle, setEditedTitle] = useState(todo.title);

  // Handle saving the edit
  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, editedTitle);
      setIsEditing(false);
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditedTitle(todo.title); // Reset to original title
    setIsEditing(false);
  };

  // Handle Enter key to save
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        disabled={isEditing}
      />
      
      {/* Show input when editing, otherwise show title */}
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </span>
      )}
      
      <span className="todo-id">ID: {todo.id}</span>
      
      {/* Show Save/Cancel buttons when editing, otherwise show Edit/Delete */}
      {isEditing ? (
        <>
          <button onClick={handleSave} className="save-button">
            ✓ Save
          </button>
          <button onClick={handleCancel} className="cancel-button">
            ✕ Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(todo.id)} className="delete-button">
            🗑️ Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
```

**What changed:**
- Added `useState` for `isEditing` and `editedTitle`
- Added conditional rendering to show input field when editing
- Added Save/Cancel buttons that appear in edit mode
- Added keyboard support (Enter to save, Escape to cancel)

**⚠️ Checkpoint:** Save the file. You'll see errors in the console - that's okay! We need to add the `onEdit` function next.

---

### Step 12: Update TodoItem Styles

**What you'll do:** Add CSS for the new edit buttons and input field.

**File: `src/components/TodoItem.css`** - Add these styles at the end:

```css
/* Edit input field */
.todo-edit-input {
  flex: 1;
  font-size: 16px;
  padding: 8px;
  border: 2px solid #1976d2;
  border-radius: 4px;
  outline: none;
}

/* Edit button */
.edit-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.edit-button:hover {
  background-color: #f57c00;
}

/* Save button */
.save-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.save-button:hover {
  background-color: #45a049;
}

/* Cancel button */
.cancel-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #9e9e9e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.cancel-button:hover {
  background-color: #757575;
}

/* Disable checkbox when editing */
.todo-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**⚠️ Checkpoint:** Save the file. Your todos should now have styled Edit buttons!

---

### Step 13: Update TodoList to Pass onEdit Prop

**What you'll do:** Pass the `onEdit` function from App down to TodoItem.

**File: `src/components/TodoList.js`** - Update the function signature and TodoItem:

Find this line:
```javascript
function TodoList({ todos, onToggle, onDelete }) {
```

Change it to:
```javascript
function TodoList({ todos, onToggle, onDelete, onEdit }) {
```

Then find this block:
```javascript
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
```

Change it to:
```javascript
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
```

**What changed:** We're now accepting and passing down the `onEdit` prop.

---

### Step 14: Add editTodo Function to App.js

**What you'll do:** Create the function that updates a todo's title via the API.

**File: `src/App.js`** - Add this function after the `deleteTodo` function:

```javascript
  // FUNCTION: Edit a todo's title
  const editTodo = async (id, newTitle) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    
    try {
      // Making a PUT request to update the todo
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoToUpdate,
          title: newTitle
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      // Update the local state with the new title
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };
```

**Breaking it down:**
1. Find the todo we want to edit
2. Make a PUT request with the new title
3. Update local state to show the change immediately

---

### Step 15: Pass editTodo to TodoList

**What you'll do:** Connect the function to your components.

**File: `src/App.js`** - Find the TodoList component in the return statement:

Find this:
```javascript
      {!loading && !error && (
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
```

Change it to:
```javascript
      {!loading && !error && (
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      )}
```

**✅ Checkpoint:** Save all files and check your browser!
- You should see an "Edit" button on each todo
- Clicking it should show an input field with Save/Cancel buttons
- You can edit the title and save it
- Press Enter to save or Escape to cancel

---


### Error: "Cannot read property 'map' of undefined"

**Problem:** `todos` is undefined

**Solution:** Initialize state with empty array
```javascript
const [todos, setTodos] = useState([]); // Not useState()
```

### Error: "Each child should have a unique key prop"

**Problem:** Missing `key` prop in mapped items

**Solution:** Add key prop
```javascript
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

### Todos don't persist after refresh

**Problem:** JSONPlaceholder is a fake API

**Solution:** This is normal! The API simulates changes but doesn't save them. For real persistence, you'd need a real backend.

### Checkbox doesn't update

**Problem:** Not calling the toggle function properly

**Solution:** Make sure you're passing the function correctly
```javascript
<input onChange={() => onToggle(todo.id)} />
```

### API call fails with CORS error

**Problem:** Browser security blocking the request

**Solution:** JSONPlaceholder supports CORS, so this shouldn't happen. If it does:
- Check your internet connection
- Try a different browser
- Check if any browser extensions are blocking it

---

## Exercises for Practice

🎯 **Want to improve your app?** Try these challenges in order!

### Beginner Level

**1. Add a Counter**

**Goal:** Show how many todos are completed vs incomplete

**What to do:**
- In `App.js`, add these calculations before the return statement:
  ```javascript
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  ```
- Display them in your JSX:
  ```javascript
  <p>Completed: {completedCount} / {totalCount}</p>
  ```

**Expected result:** You see "Completed: 3 / 10" (numbers will vary)

---

**2. Add Background Colors**

**Goal:** Give completed todos a different background color

**What to do:**
- In `TodoItem.css`, update the `.todo-item` class:
  ```css
  .todo-item {
    /* existing styles... */
    background-color: white;
    transition: background-color 0.3s;
  }
  
  .todo-item.completed-todo {
    background-color: #e8f5e9;
  }
  ```
- In `TodoItem.js`, update the div className:
  ```javascript
  <div className={`todo-item ${todo.completed ? 'completed-todo' : ''}`}>
  ```

**Expected result:** Completed todos have a light green background

---

**3. Disable Add Button While Loading**

**Goal:** Prevent multiple clicks while fetching data

**What to do:**
- In `App.js`, find the "Add New Todo" button
- Add the `disabled` attribute:
  ```javascript
  <button onClick={addTodo} disabled={loading}>
    Add New Todo
  </button>
  ```

**Expected result:** Button is greyed out and not clickable while loading

---

### Intermediate Level

**4. Filter Todos (All/Active/Completed)**

**Goal:** Add buttons to filter which todos are shown

**Step-by-step:**

1. Add filter state in `App.js`:
   ```javascript
   const [filter, setFilter] = useState('all');
   ```

2. Filter the todos before passing to TodoList:
   ```javascript
   const filteredTodos = todos.filter(todo => {
     if (filter === 'active') return !todo.completed;
     if (filter === 'completed') return todo.completed;
     return true; // 'all'
   });
   ```

3. Add filter buttons in the JSX:
   ```javascript
   <div className="filters">
     <button onClick={() => setFilter('all')} 
             className={filter === 'all' ? 'active' : ''}>
       All
     </button>
     <button onClick={() => setFilter('active')}
             className={filter === 'active' ? 'active' : ''}>
       Active
     </button>
     <button onClick={() => setFilter('completed')}
             className={filter === 'completed' ? 'active' : ''}>
       Completed
     </button>
   </div>
   ```

4. Pass `filteredTodos` instead of `todos` to TodoList:
   ```javascript
   <TodoList todos={filteredTodos} ... />
   ```

**Expected result:** Clicking filter buttons shows/hides different todos

---

**5. Search Feature**

**Goal:** Add a search box to find todos by title

**Step-by-step:**

1. Add search state in `App.js`:
   ```javascript
   const [searchTerm, setSearchTerm] = useState('');
   ```

2. Add search input in the JSX (before the controls div):
   ```javascript
   <input
     type="text"
     placeholder="Search todos..."
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     className="search-input"
   />
   ```

3. Filter todos by search term:
   ```javascript
   const filteredTodos = todos.filter(todo =>
     todo.title.toLowerCase().includes(searchTerm.toLowerCase())
   );
   ```

4. Add CSS in `App.css`:
   ```css
   .search-input {
     width: 100%;
     padding: 12px;
     font-size: 16px;
     border: 2px solid #ddd;
     border-radius: 4px;
     margin-bottom: 20px;
   }
   ```

**Expected result:** Typing in the search box filters the visible todos

---

**6. Better Add Form**

**Goal:** Replace `prompt()` with a proper form component

**What to do:**

1. Add state for new todo input:
   ```javascript
   const [newTodoTitle, setNewTodoTitle] = useState('');
   ```

2. Update `addTodo` function:
   ```javascript
   const addTodo = async () => {
     if (!newTodoTitle.trim()) return;
     
     try {
       const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ title: newTodoTitle, completed: false, userId: 1 })
       });
       if (!response.ok) throw new Error('Failed to add todo');
       const newTodo = await response.json();
       setTodos([newTodo, ...todos]);
       setNewTodoTitle(''); // Clear input
     } catch (err) {
       setError(err.message);
     }
   };
   ```

3. Replace the "Add New Todo" button with a form:
   ```javascript
   <div className="add-todo-form">
     <input
       type="text"
       placeholder="Enter new todo..."
       value={newTodoTitle}
       onChange={(e) => setNewTodoTitle(e.target.value)}
       onKeyPress={(e) => e.key === 'Enter' && addTodo()}
     />
     <button onClick={addTodo}>Add</button>
   </div>
   ```

**Expected result:** A nice input field instead of a popup prompt

---

### Advanced Level

**7. Local Storage Persistence**

**Goal:** Save todos to browser storage so they survive page refresh

**Step-by-step:**

1. Load todos from localStorage on startup:
   ```javascript
   const [todos, setTodos] = useState(() => {
     const saved = localStorage.getItem('todos');
     return saved ? JSON.parse(saved) : [];
   });
   ```

2. Save todos whenever they change:
   ```javascript
   useEffect(() => {
     localStorage.setItem('todos', JSON.stringify(todos));
   }, [todos]);
   ```

**Expected result:** Your todos persist even after refreshing the page!

---

**8. Animations**

**Goal:** Add smooth animations when adding/removing todos

**What to do:**

1. Install a library or use CSS transitions
2. Wrap TodoList in a transition group
3. Add CSS for fade-in/fade-out effects

**Hint:** Look up "React transition group" or use CSS animations

---

**9. User Selection**

**Goal:** Fetch todos for different users

**Step-by-step:**

1. Add user state:
   ```javascript
   const [selectedUser, setSelectedUser] = useState(1);
   ```

2. Update fetchTodos to use selected user:
   ```javascript
   const url = `https://jsonplaceholder.typicode.com/todos?userId=${selectedUser}&_limit=10`;
   ```

3. Add user selector dropdown:
   ```javascript
   <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
     {[1,2,3,4,5,6,7,8,9,10].map(num => (
       <option key={num} value={num}>User {num}</option>
     ))}
   </select>
   ```

4. Fetch new todos when user changes:
   ```javascript
   useEffect(() => {
     fetchTodos();
   }, [selectedUser]);
   ```

**Expected result:** Dropdown to switch between different users' todos

---

**10. Dark Mode Toggle**

**Goal:** Add a dark/light theme switcher

**Step-by-step:**

1. Add theme state:
   ```javascript
   const [darkMode, setDarkMode] = useState(false);
   ```

2. Add toggle button:
   ```javascript
   <button onClick={() => setDarkMode(!darkMode)}>
     {darkMode ? '☀️ Light' : '🌙 Dark'}
   </button>
   ```

3. Apply theme class to App:
   ```javascript
   <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
   ```

4. Add dark theme CSS:
   ```css
   .dark-theme {
     background-color: #1e1e1e;
     color: #fff;
   }
   .dark-theme .todo-item {
     background-color: #2d2d2d;
   }
   ```

**Expected result:** Clicking the button switches between dark and light modes

---
