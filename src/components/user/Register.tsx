'use client';
import {
  ADMIN_REGISTER_INPUT,
  REGISTER_FIELD,
  REGISTER_INPUT,
  USER_ROLE,
} from '@/constants';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { UserFormContainer } from '@/components';
import { User, UserState } from '@/interfaces';
import Link from 'next/link';
import axios from 'axios';
import { isValidated } from '@/utils/index';

interface Props {
  data?: User;
  inputForm: typeof REGISTER_INPUT | typeof ADMIN_REGISTER_INPUT;
  method?: 'add' | 'update';
  formAccess: USER_ROLE;
}

const Register = ({
  data,
  inputForm,
  method = 'add',
  formAccess = USER_ROLE.USER,
}: Props) => {
  const [register, setRegister] = useState<UserState>(
    Object.assign(
      {},
      ...inputForm.map(({ name }) => {
        if (data) {
          if (name === REGISTER_FIELD.CONFIRM_PASSWORD)
            return {
              [name]: { value: data[REGISTER_FIELD.PASSWORD], error: '' },
            };
          return { [name]: { value: data[name], error: '' } };
        }
        if (name === REGISTER_FIELD.ROLE) {
          return {
            [name]: { value: USER_ROLE.USER, error: '' },
          };
        }
        return {
          [name]: { value: '', error: '' },
        };
      })
    )
  );

  console.log(register);

  const validate = () => {
    let errors = { ...register };

    if (
      !register[REGISTER_FIELD.USERNAME].value.match(/^([a-zA-z]|[0-9]){5,}$/gm)
    )
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

  const handleClick = async () => {
    validate();
    if (!isValidated(register)) {
      return enqueueSnackbar('Uzupełnij poprawnie swoje dane', {
        variant: 'error',
      });
    }
    enqueueSnackbar('Pomyślnie zarejestrowano', {
      variant: 'success',
    });

    const userData = Object.assign(
      {},
      ...Object.entries(register).map((item) => {
        if (item[0] === REGISTER_FIELD.CONFIRM_PASSWORD) return;
        return { [item[0]]: item[1].value };
      })
    );
    if (method === 'add') {
      const {
        data: { info, type },
      } = await axios.post('/api/admin/users', userData);
      enqueueSnackbar(info, {
        variant: type,
      });
    }
    if (method === 'update') {
      const {
        data: { info, type },
      } = await axios.put(`/api/admin/users/${data!._id}`, userData);
      enqueueSnackbar(info, {
        variant: type,
      });
    }
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

  console.log(typeof inputForm);

  return (
    <>
      <SnackbarProvider />
      <UserFormContainer>
        <>
          {inputForm.map(({ name, label, type }, index) => {
            console.log(formAccess, name);
            if (
              formAccess === USER_ROLE.ADMIN &&
              name === REGISTER_FIELD.ROLE
            ) {
              return (
                <FormControl key={index}>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    row
                    value={register[name]!.value}
                    onChange={handleChange}
                    name={name}
                  >
                    {Object.values(USER_ROLE).map((role, index) => (
                      <FormControlLabel
                        key={index}
                        value={role}
                        control={<Radio />}
                        label={role}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }
            return (
              <TextField
                key={index}
                fullWidth
                variant="outlined"
                label={label}
                type={type}
                name={name}
                value={register[name]!.value}
                onChange={handleChange}
                error={!!register[name]!.error}
                helperText={register[name]!.error}
              />
            );
          })}
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
        <>
          {formAccess === USER_ROLE.USER && (
            <Link
              href="/user/login"
              style={{ justifyContent: 'center', alignContent: 'center' }}
            >
              <Button variant="text">Masz konto ? Zaloguj się</Button>
            </Link>
          )}
        </>
      </UserFormContainer>
    </>
  );
};

export default Register;
