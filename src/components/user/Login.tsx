'use client';
import LOGIN_FIELD from '@/constants/user/login';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { UserFormContainer } from '@/components';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

const UserLogin = () => {
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

  const handleLogin = async () => {
    console.log('logowanie');
    // const res = await axios.post('/api/auth/login', { ...login });

    const res = await signIn('credentials', {
      ...login,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <>
      <SnackbarProvider />
      <UserFormContainer>
        <TextField
          fullWidth
          label="Nazwa użytkownika"
          variant="outlined"
          name={LOGIN_FIELD.USERNAME}
          value={login[LOGIN_FIELD.USERNAME]}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Hasło"
          variant="outlined"
          type="password"
          name={LOGIN_FIELD.PASSWORD}
          value={login[LOGIN_FIELD.PASSWORD]}
          onChange={handleChange}
        />
        <Button
          fullWidth
          color="success"
          variant="contained"
          onClick={handleLogin}
        >
          Zaloguj
        </Button>
        <Link
          href="/user/register"
          style={{ justifyContent: 'center', alignContent: 'center' }}
        >
          <Button variant="text">Nie masz konta ? Zarejestruj się</Button>
        </Link>
      </UserFormContainer>
    </>
  );
};

export default UserLogin;
