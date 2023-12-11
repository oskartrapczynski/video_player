'use client';
import { BackButton, Register, VideoAdd } from '@/components';
import { ADMIN_REGISTER_INPUT, USER_ROLE } from '@/constants/index';
import { User } from '@/interfaces';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { Types } from 'mongoose';

const AddPage = () => {
  const handleInsert = async () => {
    const users: User[] = [
      {
        _id: new Types.ObjectId('6573b04e0804493456e584f0'),
        username: 'admin',
        password: '!@QWaszx',
        role: USER_ROLE.ADMIN,
        firstname: 'Jan',
        lastname: 'Kowalski',
        address: 'Myszków 3a, Nigdzie',
        tel: '111222333',
        registerAt: 1700825424000,
      },
      {
        _id: new Types.ObjectId('6573b04e0804493456e584f1'),
        username: 'adam',
        password: '!@#QWEasdzxc',
        role: USER_ROLE.USER,
        firstname: 'Adam',
        lastname: 'Nikt',
        address: 'Gdzies 6b, Daleko',
        tel: '222333444',
        registerAt: 1700919024000,
      },
      {
        _id: new Types.ObjectId('6573b04e0804493456e584f2'),
        username: 'jerzy',
        password: '!@#QWEasdzxc',
        role: USER_ROLE.USER,
        firstname: 'Jerzy',
        lastname: 'Na Wierzy',
        address: 'Kroniki 4c, Swiętyce',
        tel: '333444555',
        registerAt: 1697877024000,
      },
      {
        _id: new Types.ObjectId('6573b04e0804493456e584f3'),
        username: 'kacper',
        password: '!@#QWEasdzxc',
        role: USER_ROLE.USER,
        firstname: 'Kacper',
        lastname: 'Przycisk',
        address: 'Kogutów 3e, Pierniki',
        tel: '444555666',
        registerAt: 1677871680000,
      },
      {
        _id: new Types.ObjectId('6573b04e0804493456e584f4'),
        username: 'janusz',
        password: '!@#QWEasdzxc',
        role: USER_ROLE.USER,
        firstname: 'Janusz',
        lastname: 'Grażynka',
        address: 'Taniowice 99v, Promocjów',
        tel: '999888777',
        registerAt: 1687429940000,
      },
    ];
    const {
      data: { info, type },
    } = await axios.post('/api/admin/users', users);
    enqueueSnackbar(info, {
      variant: type,
    });
    console.log(info);
  };

  return (
    <Box sx={{ p: 2 }}>
      <BackButton />
      <Button variant="contained" color="success" onClick={handleInsert}>
        Importuj użytkowników
      </Button>
      <Register
        inputForm={ADMIN_REGISTER_INPUT}
        method="add"
        formAccess={USER_ROLE.ADMIN}
      />
    </Box>
  );
};

export default AddPage;
