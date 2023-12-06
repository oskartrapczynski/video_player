'use client';
import { REGISTER_FIELD, REGISTER_INPUT } from '@/constants';
import { Button, TextField } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { UserFormContainer } from '@/components';
import { RegisterState } from '@/interfaces';
import Link from 'next/link';

const Register = () => {
  const [register, setRegister] = useState<RegisterState>(
    Object.assign(
      {},
      ...REGISTER_INPUT.map(({ name }) => ({
        [name]: { value: '', error: '' },
      }))
    )
  );

  const isValidated = () => {
    try {
      Object.values(register).forEach((item) => {
        if (item.error) throw new Error();
      });
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    let errors = { ...register };

    if (!register[REGISTER_FIELD.USERNAME].value.match(/^[a-zA-z]{5,}$/gm))
      errors[REGISTER_FIELD.USERNAME].error =
        'Login nie może zawierać znaków diakratycznych, specjalnych i być krótszy niż 5';

    if (
      !register[REGISTER_FIELD.PASSWORD].value.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    )
      errors[REGISTER_FIELD.PASSWORD].error =
        'Hasło powinno mieć długość 8, posiadać minimum 1 znak specjalny, dużą literę i cyfrę';

    if (
      register[REGISTER_FIELD.PASSWORD].value !==
      register[REGISTER_FIELD.CONFIRM_PASSWORD].value
    )
      errors[REGISTER_FIELD.CONFIRM_PASSWORD].error =
        'Hasła powinny być identyczne';

    if (
      !register[REGISTER_FIELD.PASSWORD].value ||
      register[REGISTER_FIELD.PASSWORD].value.length === 0
    )
      errors[REGISTER_FIELD.CONFIRM_PASSWORD].error =
        'Hasło nie może być puste';

    if (!register[REGISTER_FIELD.FIRSTNAME].value)
      errors[REGISTER_FIELD.FIRSTNAME].error = 'Imię nie może być puste';
    if (!register[REGISTER_FIELD.LASTNAME].value)
      errors[REGISTER_FIELD.LASTNAME].error = 'Imię nie może być puste';
    if (!register[REGISTER_FIELD.ADDRESS].value)
      errors[REGISTER_FIELD.ADDRESS].error = 'Imię nie może być puste';
    if (
      !register[REGISTER_FIELD.TEL].value ||
      register[REGISTER_FIELD.TEL].value.length !== 9
    )
      errors[REGISTER_FIELD.TEL].error = 'Telefon musi zawierać 9 cyfr';

    setRegister({ ...errors });
  };

  const handleClick = () => {
    validate();
    isValidated()
      ? enqueueSnackbar('Pomyślnie zarejestrowano', {
          variant: 'success',
        })
      : enqueueSnackbar('Uzupełnij poprawnie swoje dane', {
          variant: 'error',
        });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!e.target.name) throw new Error('Error in register form');

      const { name, value } = e.target;

      if (
        name === REGISTER_FIELD.TEL &&
        value !== '' &&
        !value.match(/^[0-9]{1,9}$/gm)
      )
        return;

      setRegister((prev) => ({ ...prev, [name]: { value: value, error: '' } }));
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <SnackbarProvider />
      <UserFormContainer>
        <>
          {REGISTER_INPUT.map(({ name, label, type }, index) => (
            <TextField
              key={index}
              fullWidth
              variant="outlined"
              label={label}
              type={type}
              name={name}
              value={register[name].value}
              onChange={handleChange}
              error={!!register[name].error}
              helperText={register[name].error}
            />
          ))}
        </>
        <Button
          sx={{ mt: 2, p: 1.5 }}
          fullWidth
          color="success"
          variant="contained"
          onClick={handleClick}
        >
          Zarejestruj
        </Button>
        <Link
          href="/user/login"
          style={{ justifyContent: 'center', alignContent: 'center' }}
        >
          <Button variant="text">Masz konto ? Zaloguj się</Button>
        </Link>
      </UserFormContainer>
    </>
  );
};

export default Register;
