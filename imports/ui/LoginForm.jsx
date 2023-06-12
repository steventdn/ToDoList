import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { LoginWithGithub } from './LoginWithGithub';
import {Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };
 
  return (
      <form onSubmit={submit} className="login-form">
        <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Take control of your work and personal life.
          </Typography>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '300px', marginTop: '16px' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '32px' }}>
            Boost your productivity and find peace of mind To-Do. Task manager and to-do list app by STN.
          </Typography>
        </div>

        <LoginWithGithub />
        <div style={{ marginBottom: '8px' }}>
          <Typography variant="body1">Username</Typography>
          <TextField type="text" placeholder="Username" name="username" onChange={e => setUsername(e.target.value)} />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <Typography variant="body1">Password</Typography>
          <TextField type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>

        <Button color="primary" variant="outlined" onClick={submit} style={{ margin: '16px 0' }}>
          Log In
        </Button>
      </form>
  );
};
