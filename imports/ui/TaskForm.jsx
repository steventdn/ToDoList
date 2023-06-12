import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Check } from '@mui/icons-material';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  return (
    <>
      
      
      <form className="task-form" onSubmit={handleSubmit}>

    <TextField
      type="text"
      label="Type to add new tasks"
      placeholder="Type to add new tasks"
      value={text}
      onChange={e => setText(e.target.value)}
      style={{ width: '100%', marginRight: '16px' }}
    />


      
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    
      </form>
    </>
    
   
  );
};