'use client';

import React from 'react';
import { useGetSiswa } from '@/query/siswa';
import { Skeleton } from '@mui/material';

import { type SiswaColumns } from '@/types/siswa';

import ErrorDisplayTable from '../layout/error-display-table';
import { TableSiswa } from './table-siswa';

const siswaColumns: SiswaColumns[] = [
  {
    id: 'no',
    numeric: true,
    label: 'No',
  },
  {
    id: 'username',
    numeric: false,
    label: 'Nama',
  },
  {
    id: 'nis',
    numeric: true,
    label: 'NIS',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'No HP',
  },
  {
    id: 'action',
    numeric: false,
    label: 'Action',
  },
];

export default function DisplaySiswa(): React.JSX.Element {
  const { data, isLoading, isError } = useGetSiswa();

  if (isLoading) return <Skeleton variant="rounded" height={430} />;
  if (isError) return <ErrorDisplayTable />;
  return <TableSiswa data={data!} columns={siswaColumns} />;
}
