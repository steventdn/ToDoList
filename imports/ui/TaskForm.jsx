import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

    <TextField
      type="text"
      label="Type to add new tasks"
      placeholder="Type to add new tasks"
      value={text}
      onChange={e => setText(e.target.value)}
    />
    <Button type="submit" variant="contained" color="primary">
      Add Task
    </Button>
   
    </form>

   
  );
};