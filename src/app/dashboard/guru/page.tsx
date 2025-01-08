/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAddGuru } from '@/query/guru';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';

import { type FormGuru } from '@/types/guru';
import DisplayGuru from '@/components/dashboard/guru/display-guru';
import { FilterGuru } from '@/components/dashboard/guru/filter-guru';
import ModalAddGuru from '@/components/dashboard/modal/modal-add-guru';

const pageName = 'Guru';
export default function Page(): React.JSX.Element {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const mutation = useAddGuru();

  const handleSubmitAdd = async (data: FormGuru) => {
    const toastAdd = toast.loading('Sedang memproses...', {
      position: 'bottom-right',
    });

    try {
      const response = await mutation?.mutateAsync({
        username: data?.username,
        nip: data?.nip,
        password: '123',
        phone: data?.phone,
        role: 'guru',
      });
      toast.update(toastAdd, {
        render: 'Data berhasil dibuat',
        type: 'success',
        isLoading: false,
        position: 'bottom-right',
        autoClose: 5000,
      });
      setOpenModalAdd(false);
      return response;
    } catch (error) {
      toast.update(toastAdd, {
        // @ts-expect-error
        render: `Data gagal dibuat. ${error?.response?.data?.error || ''}`,
        type: 'error',
        isLoading: false,
        position: 'bottom-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Halaman {pageName}</Typography>
          <Breadcrumbs className="breadcrumbs">
            <Link href="/dashboard">Dashboard</Link>
            <Typography color="text.primary">{pageName}</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <FilterGuru setOpenModalAdd={setOpenModalAdd} pageName={pageName} />
      <DisplayGuru />
      <ModalAddGuru
        pageName={pageName}
        open={openModalAdd}
        handleClose={() => {
          setOpenModalAdd(false);
        }}
        handleSubmitAdd={handleSubmitAdd}
      />
      <ToastContainer />
    </Stack>
  );
}
