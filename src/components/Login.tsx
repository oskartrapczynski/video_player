'use client';
import LOGIN_FIELD from '@/constants/login';
import { Box, Button, TextField } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState({
    [LOGIN_FIELD.USERNAME]: '',
    [LOGIN_FIELD.PASSWORD]: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!e.target.name) throw new Error('Error in login form');

      const { name, value } = e.target;

      switch (name) {
        case LOGIN_FIELD.USERNAME: {
          return setLogin((prev) => ({
            ...prev,
            [LOGIN_FIELD.USERNAME]: value,
          }));
        }
        case LOGIN_FIELD.PASSWORD: {
          return setLogin((prev) => ({
            ...prev,
            [LOGIN_FIELD.PASSWORD]: value,
          }));
        }
      }
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <SnackbarProvider />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          flexGrow: 1,
          flexWrap: 'wrap',
          gap: 1,
          width: 500,
          height: 300,
          p: 10,
          borderRadius: 5,
          background:
            'linear-gradient(to top, #0cebeb55, #20e3b255, #29ffc655)',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          name={LOGIN_FIELD.USERNAME}
          value={login[LOGIN_FIELD.USERNAME]}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          name={LOGIN_FIELD.PASSWORD}
          value={login[LOGIN_FIELD.PASSWORD]}
          onChange={handleChange}
        />
        <Button fullWidth variant="contained">
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
