import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const taskStyle = {
    backgroundColor: '#f5f5f5', // Set the desired grey color
    padding: '8px', // Adjust the padding as needed
    marginBottom: '8px', // Add margin-bottom for spacing between tasks
    marginTop: '8px', // Add margin-top for spacing on top of tasks
  };

  return (
    <li style={taskStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
        <span>{task.text}</span>
      </div>
      <button
        style={{ marginLeft: 'auto' }}
        onClick={() => onDeleteClick(task)}
      >
        &times;
      </button>
    </li>
  );
};