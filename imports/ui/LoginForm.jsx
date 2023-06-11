import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { LoginWithGithub } from './LoginWithGithub';
import { Button, IconButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';



export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (

    //Username 
    <form onSubmit={submit} className="login-form">
      <LoginWithGithub />
      <div>
        <Typography variant = "body1">
            Username
        </Typography>
    
        <TextField
          type="text"
          label="Username"
          placeholder="Username"
          name="username"

          onChange={e => setUsername(e.target.value)}
        />
      </div>

      {/*Password */}
      <div>
        <Typography variant = "body1">
            Password
        </Typography>
  
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
     
     <Button color="primary" variant="outlined" onClick={submit}>
        Log In
      </Button>
    </form>

  );
};