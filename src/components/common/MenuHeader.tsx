'use client';

import { Button, ButtonOwnProps, Stack } from '@mui/material';
import Link from 'next/link';

import { USER_ROLE } from '@/constants';
import { signOut, useSession } from 'next-auth/react';

const MenuHeader = () => {
  const session = useSession();
  const adminMenu = [
    { name: 'Filmy', path: 'admin/videos', color: 'error' },
    { name: 'Klienci', path: 'admin/users', color: 'error' },
    { name: 'Wypożyczenia', path: 'admin/borrows', color: 'error' },
  ];

  const anonymousMenu = [
    { name: 'Logowanie', path: 'user/login', color: 'success' },
    { name: 'Rejestracja', path: 'user/register', color: 'success' },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Stack
      component="nav"
      direction="row"
      spacing={2}
      sx={{
        alignContent: 'center',
        justifyContent: 'center',

        p: 2,
        mb: 2,
        background: 'linear-gradient(to top, #0cebebaa, #20e3b2aa, #29ffc6aa)',
      }}
    >
      <Link href="/">
        <Button variant="contained">Start</Button>
      </Link>
      {!session.data &&
        anonymousMenu.map(({ name, path, color = 'primary' }, index) => (
          <Link key={index} href={`/${path}`}>
            <Button
              variant="contained"
              color={color as ButtonOwnProps['color']}
            >
              {name}
            </Button>
          </Link>
        ))}
      {session.data &&
        session.data.user.role === USER_ROLE.ADMIN &&
        adminMenu.map(({ name, path, color = 'primary' }, index) => (
          <Link key={index} href={`/${path}`}>
            <Button
              variant="contained"
              color={color as ButtonOwnProps['color']}
            >
              {name}
            </Button>
          </Link>
        ))}

      {session.data && session.data.user.role === USER_ROLE.USER && (
        <Link href={`/user/${session.data.user._id!}`}>
          <Button variant="contained">Profil</Button>
        </Link>
      )}
      {session.status === 'authenticated' && (
        <Button variant="contained" color="warning" onClick={handleLogout}>
          Wyloguj
        </Button>
      )}
    </Stack>
  );
};

export default MenuHeader;
