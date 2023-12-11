import { BackButton, Register } from '@/components';
import { ADMIN_REGISTER_INPUT, USER_ROLE } from '@/constants';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { userModel } from '@/lib/mongo/models';
import { mongoId } from '@/utils';
import { Alert, Box } from '@mui/material';
import React from 'react';

interface Params {
  params: {
    userId: string | null;
  };
}

export const getData = async (id: string) => {
  await dbConnect();
  const data = await userModel.find({ _id: mongoId(id) });
  await dbDisconnect();
  return data ? JSON.stringify(data) : null;
};

const EditPage = async ({ params: { userId } }: Params) => {
  const data = userId ? await getData(userId) : null;
  const video = data ? JSON.parse(data) : null;
  return !video ? (
    <Alert severity="error">Nie załadowano</Alert>
  ) : (
    <Box sx={{ p: 2 }}>
      <BackButton />
      <Register
        inputForm={ADMIN_REGISTER_INPUT}
        data={video[0]}
        method="update"
        formAccess={USER_ROLE.ADMIN}
      />
    </Box>
  );
};

export default EditPage;
