'use client';
import { Button } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const handleUndo = () => {
    router.back();
  };
  return (
    <Button variant="outlined" startIcon={<UndoIcon />} onClick={handleUndo}>
      Cofnij
    </Button>
  );
};

export default BackButton;
