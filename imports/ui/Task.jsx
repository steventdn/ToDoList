import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <Checkbox
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <Typography>{task.text}</Typography>
      <IconButton onClick={() => onDeleteClick(task)}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
};