/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable jsx-a11y/no-autofocus */
'use client';

import React from 'react';
import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';

import { type FormGuru, type ModalAddGuruProps } from '@/types/guru';

export default function ModalAddGuru(props: ModalAddGuruProps): React.JSX.Element {
  const { open, handleClose, handleSubmitAdd, pageName } = props;
  const { control, handleSubmit, reset } = useForm<FormGuru>();

  const onSubmit = async (data: FormGuru) => {
    await handleSubmitAdd(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        '.MuiDialog-paper': {
          borderRadius: '15px',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle component="div" sx={{ paddingTop: '32px !important' }}>
          Tambah {pageName}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => <TextField {...field} label="Username" autoFocus fullWidth />}
          />
          <Controller
            name="nip"
            control={control}
            rules={{ required: 'nip is required' }}
            render={({ field }) => <TextField {...field} label="NIP" autoFocus fullWidth />}
          />
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'phone is required' }}
            render={({ field }) => <TextField {...field} label="No HP" type="number" autoFocus fullWidth />}
          />
        </DialogContent>
        <DialogActions
          sx={{
            padding: '16px 24px 24px 24px',
          }}
          className="modal-action-frame"
        >
          <Button onClick={handleClose} variant="outlined">
            Batal
          </Button>
          <Button type="submit" variant="contained">
            Tambah
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
