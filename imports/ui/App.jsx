import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { Box, Typography, Container, Button } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const logout = () => Meteor.logout();

  return (
    <>
    <Container maxWidth= "md">
      <Box className="app">
      <header>
        <Box className="app-bar">
          <Box className="app-header" display="flex" alignItems="center">
            <ChecklistIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
            <Typography variant="h6" component="h6">
              To Do List
              {pendingTasksTitle}
            </Typography>
          </Box>
        </Box>
      </header>




        <Box className="main">
          {user ? (
            <Fragment>
            <div className="user" onClick={logout}>
              <div className="user-info">
                {user.username || user.profile.name}
              </div>
                <ExitToAppIcon />
            </div>

              <TaskForm />
              
              <Box className="filter">
                <Button onClick={() => setHideCompleted(!hideCompleted)} color= "primary" variant="contained">
                  {hideCompleted ? 'Show All' : 'Hide Completed'}
                </Button>
              </Box>

              {isLoading && <Box className="loading">loading...</Box>}

              <ul className="tasks">
                {tasks.map(task => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))}
              </ul>
            </Fragment>
          ) : (
            <LoginForm />
          )}
        </Box>
      </Box>
    </Container>
    </>
  );
};