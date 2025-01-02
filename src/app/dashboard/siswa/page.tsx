/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAddSiswa } from '@/query/siswa';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ModalAddSiswa from '@/components/dashboard/modal/modal-add-siswa';
import DisplaySiswa from '@/components/dashboard/siswa/display-siswa';
import { FilterSiswa } from '@/components/dashboard/siswa/filter-siswa';

export default function Page(): React.JSX.Element {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const mutation = useAddSiswa();

  const handleSubmitAdd = async (data: { username: string; nis: string; phone: string }) => {
    try {
      const response = await mutation?.mutateAsync({
        username: data?.username,
        nis: data?.nis,
        password: '123',
        phone: data?.phone,
        role: 'siswa',
      });
      // console.log('Data berhasil dikirim:', response.data);
      setOpenModalAdd(false);
      return response;
    } catch (error) {
      return error;
    }
  };

  // console.log('mutation.isError', mutation?.isError);
  // console.log('mutation.error.message', mutation?.error?.message);
  // console.log('mutation.isSuccess', mutation?.isSuccess);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Halaman Siswa</Typography>
          <Breadcrumbs className="breadcrumbs">
            <Link href="/dashboard">Dashboard</Link>
            <Typography color="text.primary">Siswa</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <FilterSiswa setOpenModalAdd={setOpenModalAdd} />
      <DisplaySiswa />
      <ModalAddSiswa
        open={openModalAdd}
        handleClose={() => {
          setOpenModalAdd(false);
        }}
        handleSubmitAdd={handleSubmitAdd}
      />
    </Stack>
  );
}
