'use client';
import { DATE_TYPE, VIDEO_FIELD, VIDEO_INPUT } from '@/constants';
import { Button, TextField } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { UserFormContainer } from '@/components';
import { VideoState } from '@/interfaces';
import { decodeTimeStamp, encodeTimeStamp } from '@/utils/index';
import axios from 'axios';

interface Props {
  data?: VideoState;
  method?: 'add' | 'update';
}

const VideoAdd = ({ data, method = 'add' }: Props) => {
  const procesValue = (val: any, type: VIDEO_FIELD) => {
    if (val && type === VIDEO_FIELD.RELEASED_AT) {
      return decodeTimeStamp(Number(val), DATE_TYPE.DATE);
    }
    return val;
  };

  const [video, setVideo] = useState<VideoState>(
    Object.assign(
      {},
      ...VIDEO_INPUT.map(({ name }) => ({
        [name]: {
          value: data ? procesValue(data[name], name) : '',
          error: '',
        },
      }))
    )
  );
  let textButton = '';
  if (method === 'add') textButton = 'Dodaj';
  if (method === 'update') textButton = 'Zaktualizuj';

  const isValidated = () => {
    try {
      Object.values(video).forEach((item) => {
        if (item.error) throw new Error();
      });
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    let errors = { ...video };

    if (!video[VIDEO_FIELD.TITLE].value)
      errors[VIDEO_FIELD.TITLE].error = 'Tytuł nie może być pusty';

    if (!video[VIDEO_FIELD.GENRE].value)
      errors[VIDEO_FIELD.GENRE].error = 'Gatunek nie może być pusty';

    if (!video[VIDEO_FIELD.DIRECTOR].value)
      errors[VIDEO_FIELD.DIRECTOR].error = 'Reżyser nie może być pusty';

    if (!video[VIDEO_FIELD.LENGTH].value)
      errors[VIDEO_FIELD.LENGTH].error = 'Długość nie może być pusta';
    if (
      !video[VIDEO_FIELD.LENGTH].value.match(
        /^[0-9]{1,2}[:][0-9]{2}$|^[0-9]{1,2}[:][0-9]{2}[:][0-9]{2}$/gm
      )
    )
      errors[VIDEO_FIELD.LENGTH].error =
        'Długość powinna być wyrażona w hh:mm:ss lub mm:ss';

    if (
      video[VIDEO_FIELD.RATE].value.toString() === '' ||
      video[VIDEO_FIELD.RATE].value > 10 ||
      video[VIDEO_FIELD.RATE].value < 1
    )
      errors[VIDEO_FIELD.RATE].error = 'Ocena powinna być 1-10';

    if (!video[VIDEO_FIELD.DESCRIPTION].value)
      errors[VIDEO_FIELD.DESCRIPTION].error = 'Opis nie może być pusty';
    if (!video[VIDEO_FIELD.ACTORS].value)
      errors[VIDEO_FIELD.ACTORS].error = 'Akotrzy nie mogą być puste';
    if (!video[VIDEO_FIELD.RELEASED_AT].value)
      errors[VIDEO_FIELD.RELEASED_AT].error = 'Wydano nie może być puste';
    if (
      !video[VIDEO_FIELD.RELEASED_AT].value.match(
        /^(3[01]|[012][0-9]|[1-9]|0[1-9])[.](0[1-9]|1[0-2])[.]\d\d\d\d$/gm
      )
    )
      errors[VIDEO_FIELD.RELEASED_AT].error =
        'Wydano musi być w formacie dd.mm.yyyy';

    setVideo({ ...errors });
  };

  const handleClick = async () => {
    validate();
    if (!isValidated()) {
      return enqueueSnackbar('Uzupełnij poprawnie swoje dane', {
        variant: 'error',
      });
    }

    enqueueSnackbar('Wpisane dane są poprawne', {
      variant: 'success',
    });

    const videoValues = Object.assign(
      {},
      ...Object.entries(video).map((item) => ({
        [item[0]]: item[1].value,
      }))
    );

    const processedVideo = {
      ...videoValues,
      [VIDEO_FIELD.RELEASED_AT]: encodeTimeStamp(
        video[VIDEO_FIELD.RELEASED_AT].value
      ),
    };

    console.log(processedVideo);

    if (method === 'add') {
      const {
        data: { info, type },
      } = await axios.post('/api/admin/videos', processedVideo);
      enqueueSnackbar(info, {
        variant: type,
      });
    }
    if (method === 'update') {
      const changes = Object.assign(
        {},
        ...Object.entries(video).map((item) => ({ [item[0]]: item[1].value }))
      );
      changes[VIDEO_FIELD.RELEASED_AT] = encodeTimeStamp(
        changes[VIDEO_FIELD.RELEASED_AT]
      );

      const {
        data: { info, type },
      } = await axios.put(`/api/admin/videos/${data!._id}`, changes);
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
        name === VIDEO_FIELD.RATE &&
        value !== '' &&
        !value.match(/\b([1-9]|10)\b/gm)
      )
        return;

      setVideo((prev) => ({ ...prev, [name]: { value: value, error: '' } }));
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
          {VIDEO_INPUT.map(({ name, label, type }, index) => (
            <TextField
              key={index}
              fullWidth
              variant="outlined"
              label={label}
              type={type}
              name={name}
              value={video[name]!.value}
              onChange={handleChange}
              error={!!video[name]!.error}
              helperText={video[name]!.error}
            />
          ))}
        </>
        <Button
          sx={{ mt: 2, p: 1.5 }}
          fullWidth
          variant="contained"
          color="success"
          onClick={handleClick}
        >
          {textButton}
        </Button>
      </UserFormContainer>
    </>
  );
};

export default VideoAdd;
