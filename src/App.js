import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  // STATE: Variables that hold data and trigger re-renders when changed
  const [todos, setTodos] = useState([]);           // Stores the list of todos
  const [loading, setLoading] = useState(true);     // Tracks if data is being loaded
  const [error, setError] = useState(null);         // Stores any error messages

  // EFFECT: Runs when component first loads (empty dependency array [])
  useEffect(() => {
    fetchTodos();
  }, []);

  // FUNCTION: Fetch todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Making a GET request to fetch todos
      // We're limiting to 10 todos for simplicity
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      // Convert response to JSON
      const data = await response.json();
      
      // Update state with fetched data
      setTodos(data);
    } catch (err) {
      // If something goes wrong, store the error message
      setError(err.message);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // FUNCTION: Toggle the completed status of a todo
  const toggleTodo = async (id) => {
    // Find the todo we want to toggle
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
          completed: !todoToUpdate.completed  // Toggle the completed status
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      // Update the local state to reflect the change
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // FUNCTION: Delete a todo
  const deleteTodo = async (id) => {
    try {
      // Making a DELETE request
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      // Remove the todo from local state
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // FUNCTION: Add a new todo
  const addTodo = async () => {
    const title = prompt('Enter todo title:');
    if (!title) return;

    try {
      // Making a POST request to create a new todo
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          completed: false,
          userId: 1
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const newTodo = await response.json();
      
      // Add the new todo to the beginning of the list
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err.message);
    }
  };

  // FUNCTION: Edit a todo's title
  const editTodo = async (id, newTitle) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    
    try {
      // Making a PUT request to update the todo
      // Edit TODO: Implement the API call to update the todo's title
    } catch (err) {
      setError(err.message);
    }
  };

  // RENDER: What to display on the screen
  return (
    <div className="App">
      <h1>📝 Simple TODO App</h1>
      
      <div className="controls">
        <button onClick={addTodo}>Add New Todo</button>
        <button onClick={fetchTodos} disabled={loading}>
          Reload Todos
        </button>
      </div>

      {/* Conditional rendering: show different content based on state */}
      {loading && <div className="loading">Loading todos...</div>}
      
      {error && <div className="error">Error: {error}</div>}
      
      {!loading && !error && (
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      )}
    </div>
  );
}

export default App;
