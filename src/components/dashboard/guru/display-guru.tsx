'use client';

import React from 'react';
import { useGetGuru } from '@/query/guru';
import { Skeleton } from '@mui/material';

import { type GuruColumns } from '@/types/guru';

import ErrorDisplayTable from '../layout/error-display-table';
import { TableGuru } from './table-guru';

const guruColumns: GuruColumns[] = [
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
    id: 'nip',
    numeric: true,
    label: 'NIP',
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

export default function DisplayGuru(): React.JSX.Element {
  const { data, isLoading, isError } = useGetGuru();

  if (isLoading) return <Skeleton variant="rounded" height={430} />;
  if (isError) return <ErrorDisplayTable />;
  return <TableGuru data={data!} columns={guruColumns} />;
}
