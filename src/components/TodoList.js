import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

// This component displays a list of todos
// PROPS: Data passed from parent component (App.js)
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  
  // If there are no todos, show a message
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet! Click "Add New Todo" to create one.</p>
      </div>
    );
  }

  // Display each todo using the TodoItem component
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}              // Unique key for React to track items
          todo={todo}                // The todo object
          onToggle={onToggle}        // Function to toggle completion
          onDelete={onDelete}        // Function to delete todo
          onEdit={onEdit}            // Function to edit todo
        />
      ))}
    </div>
  );
}

export default TodoList;
