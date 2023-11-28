import { Button, Stack } from '@mui/material';
import Link from 'next/link';

const MenuHeader = () => {
  const menuItems = [
    { name: 'Start', path: '' },
    { name: 'Logowanie', path: 'user/login' },
    { name: 'Rejestracja', path: 'user/register' },
  ];
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={2}
      sx={{
        alignContent: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(to top, #0cebebaa, #20e3b2aa, #29ffc6aa)',
      }}
    >
      {menuItems.map(({ name, path }, index) => (
        <Link key={index} href={`/${path}`}>
          <Button variant="contained">{name}</Button>
        </Link>
      ))}
    </Stack>
  );
};

export default MenuHeader;
