'use client';

import React from 'react';
import { useGetSiswa } from '@/query/siswa';

import { type SiswaColumns } from '@/types/siswa';

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

  // if (isLoading) return <SectionLoading className="mt-50 sm:mt-30" />;
  // if (isError) return <SectionError />;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return <TableSiswa data={data!} columns={siswaColumns} />;
}
