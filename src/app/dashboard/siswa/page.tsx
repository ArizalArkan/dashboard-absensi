/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAddSiswa } from '@/query/siswa';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';

import { type FormSiswa } from '@/types/siswa';
import ModalAddSiswa from '@/components/dashboard/modal/modal-add-siswa';
import DisplaySiswa from '@/components/dashboard/siswa/display-siswa';
import { FilterSiswa } from '@/components/dashboard/siswa/filter-siswa';

const pageName = 'Siswa';
export default function Page(): React.JSX.Element {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const mutation = useAddSiswa();

  const handleSubmitAdd = async (data: FormSiswa) => {
    const toastAdd = toast.loading('Sedang memproses...', {
      position: 'bottom-right',
    });

    try {
      const response = await mutation?.mutateAsync({
        username: data?.username,
        nis: data?.nis,
        password: '123',
        phone: data?.phone,
        role: 'siswa',
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
      <FilterSiswa setOpenModalAdd={setOpenModalAdd} pageName={pageName} />
      <DisplaySiswa />
      <ModalAddSiswa
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
