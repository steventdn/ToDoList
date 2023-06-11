import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import Box from '@mui/material/Box';


import { createTheme, ThemeProvider } from '@mui/material';
import { Button, Typography, Container } from '@mui/material';


export const App = () => {
  const user = useTracker(() => Meteor.user());

  const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setIsChecked', _id, !isChecked);

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

  //================================================

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
    

          
      <div className="app">
        <header>
          <Box className="app-bar">
            <Box className="app-header">
              <Typography variant="h1" component="h1">
                📝️ To Do List
                {pendingTasksTitle}
              </Typography>
            </Box>
          </Box>
        </header>

        <div className="main">
          {user ? (
            <Fragment>
              <div className="user" onClick={logout}>
                {user.username || user.profile.name} Log Out🚪
              </div>

              <TaskForm />

              <div className="filter">
                <Button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Show All' : 'Hide Completed'}
                </Button>
              </div>

              {isLoading && <div className="loading">loading...</div>}

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
        </div>
      </div>
  
  );
};
