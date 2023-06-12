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
    <Button
      variant="contained"
      color="primary"
      startIcon={<GitHubIcon />}
      onClick={handleGithubLogin}
      sx={{
        fontSize: 16,
        fontWeight: 500,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          backgroundColor: '#1976d2',
        },
        '&:focus': {
          backgroundColor: '#1976d2',
          outline: 'none',
        },
      }}
    >
      Login with GitHub
    </Button>
  );
};