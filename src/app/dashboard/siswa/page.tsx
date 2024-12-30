import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { SiswaFilters } from '@/components/dashboard/customer/siswa-filters';
import { TableSiswa, type Siswa } from '@/components/dashboard/customer/table-siswa';

export const metadata = { title: `Siswa | Dashboard | ${config.site.name}` } satisfies Metadata;

const siswa = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Aryasatya Pratama Wijaya',
    nis: 123456,
    parent: 'Aditya Santoso',
    phone: '081234567890',
    class: 'XII A',
    address: { city: 'Jakarta', street: 'Jl. Merdeka No. 10' },
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Mahendra Aditya Prakoso',
    nis: 123457,
    parent: 'Prasetyo Nugroho',
    phone: '081345678901',
    class: 'X B',
    address: { city: 'Bandung', street: 'Jl. Sukajadi No. 25' },
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Naufal Rizky Pratama',
    nis: 123458,
    parent: 'Rendra Wijaya',
    phone: '081456789012',
    class: 'XI C',
    address: { city: 'Surabaya', street: 'Jl. Pahlawan No. 17' },
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Arunika Cahya Putri',
    nis: 223456,
    parent: 'Rahmat Hidayat',
    phone: '082123456789',
    class: 'XII B',
    address: { city: 'Yogyakarta', street: 'Jl. Malioboro No. 5' },
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Kirana Ayu Permata',
    nis: 223457,
    parent: 'Surya Putra',
    phone: '082234567890',
    class: 'XI A',
    address: { city: 'Semarang', street: 'Jl. Pemuda No. 8' },
  },
  {
    id: '6',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Cendana Ratri Anindya',
    nis: 223458,
    parent: 'Bimo Setiawan',
    phone: '082345678901',
    class: 'X C',
    address: { city: 'Malang', street: 'Jl. Ijen No. 3' },
  },
  {
    id: '7',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Aryasatya Pratama Wijaya',
    nis: 123456,
    parent: 'Aditya Santoso',
    phone: '081234567890',
    class: 'XII A',
    address: { city: 'Jakarta', street: 'Jl. Merdeka No. 10' },
  },
  {
    id: '8',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Mahendra Aditya Prakoso',
    nis: 123457,
    parent: 'Prasetyo Nugroho',
    phone: '081345678901',
    class: 'X B',
    address: { city: 'Bandung', street: 'Jl. Sukajadi No. 25' },
  },
  {
    id: '9',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Naufal Rizky Pratama',
    nis: 123458,
    parent: 'Rendra Wijaya',
    phone: '081456789012',
    class: 'XI C',
    address: { city: 'Surabaya', street: 'Jl. Pahlawan No. 17' },
  },
  {
    id: '10',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Arunika Cahya Putri',
    nis: 223456,
    parent: 'Rahmat Hidayat',
    phone: '082123456789',
    class: 'XII B',
    address: { city: 'Yogyakarta', street: 'Jl. Malioboro No. 5' },
  },
  {
    id: '11',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Kirana Ayu Permata',
    nis: 223457,
    parent: 'Surya Putra',
    phone: '082234567890',
    class: 'XI A',
    address: { city: 'Semarang', street: 'Jl. Pemuda No. 8' },
  },
  {
    id: '12',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Cendana Ratri Anindya',
    nis: 223458,
    parent: 'Bimo Setiawan',
    phone: '082345678901',
    class: 'X C',
    address: { city: 'Malang', street: 'Jl. Ijen No. 3' },
  },
] satisfies Siswa[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(siswa, page, rowsPerPage);

  // console.log('paginatedCustomers', paginatedCustomers);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Siswa</Typography>
          <Breadcrumbs className="breadcrumbs">
            <Link href="/dashboard">Dashboard</Link>
            <Typography color="text.primary">Siswa</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <SiswaFilters />
      <TableSiswa count={paginatedCustomers.length} page={page} rows={paginatedCustomers} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}

function applyPagination(rows: Siswa[], page: number, rowsPerPage: number): Siswa[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
