import React, { useState } from 'react';
import './TodoItem.css';

// This component displays a single todo item
// PROPS: todo object, onToggle function, onDelete function, onEdit function
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
      {/* Checkbox to mark todo as complete/incomplete */}
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
      
      {/* Badge showing todo ID */}
      <span className="todo-id">ID: {todo.id}</span>
      
      {/* Show Save/Cancel buttons when editing, otherwise show Edit/Delete */}
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="save-button"
          >
            ✓ Save
          </button>
          <button
            onClick={handleCancel}
            className="cancel-button"
          >
            ✕ Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="delete-button"
            aria-label="Delete todo"
          >
            🗑️ Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
