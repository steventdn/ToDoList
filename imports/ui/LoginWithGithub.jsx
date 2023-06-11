import React from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export const LoginWithGithub = () => {
  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup',
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleGithubLogin} startIcon={<GitHubIcon />}>
    Login with Github
    </Button>
    
  );
};