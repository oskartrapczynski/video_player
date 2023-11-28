import { Box } from '@mui/material';
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserFormContainer = ({ children }: Props) => {
  return (
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
        height: 'auto',
        p: 10,
        borderRadius: 5,
        background: 'linear-gradient(to top, #0cebeb55, #20e3b255, #29ffc655)',
      }}
    >
      {children}
    </Box>
  );
};

export default UserFormContainer;
