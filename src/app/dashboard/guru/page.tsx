import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Siswa, SiswaColumns } from '@/types/siswa';
import { config } from '@/config';
import { FilterGuru } from '@/components/dashboard/guru/filter-guru';
import { TableGuru } from '@/components/dashboard/guru/table-guru';

export const metadata = { title: `Guru | Dashboard | ${config.site.name}` } satisfies Metadata;

const siswaColumns: SiswaColumns[] = [
  {
    id: 'no',
    numeric: true,
    label: 'No',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Nama',
  },
  {
    id: 'nis',
    numeric: true,
    label: 'NIS',
  },
  {
    id: 'parent',
    numeric: false,
    label: 'Orang Tua',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'No HP',
  },
  {
    id: 'class',
    numeric: false,
    label: 'Kelas',
  },
  {
    id: 'address',
    numeric: false,
    label: 'Alamat',
  },
  {
    id: 'action',
    numeric: false,
    label: 'Action',
  },
];

const dataSiswaDummy = [
  {
    id: '1',
    name: 'Aryasatya Pratama Wijaya',
    nis: 123456,
    parent: 'Aditya Santoso',
    phone: '081234567890',
    class: 'XII A',
    address: 'Jakarta, Jl. Merdeka No. 10',
  },
  {
    id: '2',
    name: 'Mahendra Aditya Prakoso',
    nis: 123457,
    parent: 'Prasetyo Nugroho',
    phone: '081345678901',
    class: 'X B',
    address: 'Bandung, Jl. Sukajadi No. 25',
  },
  {
    id: '3',
    name: 'Naufal Rizky Pratama',
    nis: 123458,
    parent: 'Rendra Wijaya',
    phone: '081456789012',
    class: 'XI C',
    address: 'Surabaya, Jl. Pahlawan No. 17',
  },
  {
    id: '4',
    name: 'Arunika Cahya Putri',
    nis: 223456,
    parent: 'Rahmat Hidayat',
    phone: '082123456789',
    class: 'XII B',
    address: 'Yogyakarta, Jl. Malioboro No. 5',
  },
  {
    id: '5',
    name: 'Kirana Ayu Permata',
    nis: 223457,
    parent: 'Surya Putra',
    phone: '082234567890',
    class: 'XI A',
    address: 'Semarang, Jl. Pemuda No. 8',
  },
  {
    id: '6',
    name: 'Cendana Ratri Anindya',
    nis: 223458,
    parent: 'Bimo Setiawan',
    phone: '082345678901',
    class: 'X C',
    address: 'Malang, Jl. Ijen No. 3',
  },
  {
    id: '7',
    name: 'Bagas Dwi Saputra',
    nis: 123459,
    parent: 'Dedi Saputra',
    phone: '081567890123',
    class: 'XI B',
    address: 'Bogor, Jl. Pajajaran No. 12',
  },
  {
    id: '8',
    name: 'Fahri Zain Hakim',
    nis: 123460,
    parent: 'Hadi Hakim',
    phone: '081678901234',
    class: 'XII C',
    address: 'Medan, Jl. Gatot Subroto No. 18',
  },
  {
    id: '9',
    name: 'Aulia Zahra Putri',
    nis: 223459,
    parent: 'Fajar Putra',
    phone: '082456789012',
    class: 'X A',
    address: 'Depok, Jl. Margonda Raya No. 22',
  },
  {
    id: '10',
    name: 'Indira Maharani',
    nis: 223460,
    parent: 'Hendra Wijaya',
    phone: '082567890123',
    class: 'XII D',
    address: 'Palembang, Jl. Demang Lebar No. 7',
  },
  {
    id: '11',
    name: 'Raka Febrianto',
    nis: 123461,
    parent: 'Febri Santoso',
    phone: '081789012345',
    class: 'XI D',
    address: 'Bali, Jl. Kuta No. 15',
  },
  {
    id: '12',
    name: 'Anisa Fitriani',
    nis: 223461,
    parent: 'Budi Fitri',
    phone: '082678901234',
    class: 'XI E',
    address: 'Makassar, Jl. Pettarani No. 3',
  },
  {
    id: '13',
    name: 'Galih Putra Pratama',
    nis: 123462,
    parent: 'Yudi Pratama',
    phone: '081890123456',
    class: 'X B',
    address: 'Malang, Jl. Veteran No. 2',
  },
  {
    id: '14',
    name: 'Hafiz Ramadhan',
    nis: 123463,
    parent: 'Rizal Ramadhan',
    phone: '081901234567',
    class: 'XII E',
    address: 'Bandung, Jl. Braga No. 4',
  },
  {
    id: '15',
    name: 'Laras Sekar Ayu',
    nis: 223462,
    parent: 'Adi Kurniawan',
    phone: '082789012345',
    class: 'X A',
    address: 'Bogor, Jl. Raya Cibinong No. 9',
  },
  {
    id: '16',
    name: 'Iqbal Trianggoro',
    nis: 123464,
    parent: 'Trianggoro Saputra',
    phone: '081912345678',
    class: 'XI C',
    address: 'Surabaya, Jl. Darmo No. 10',
  },
  {
    id: '17',
    name: 'Fikri Akbar Setiawan',
    nis: 123465,
    parent: 'Akbar Setiawan',
    phone: '081123456789',
    class: 'X B',
    address: 'Solo, Jl. Slamet Riyadi No. 8',
  },
  {
    id: '18',
    name: 'Nabila Dwi Utami',
    nis: 223463,
    parent: 'Dwi Utomo',
    phone: '082890123456',
    class: 'XII A',
    address: 'Semarang, Jl. Pandanaran No. 11',
  },
  {
    id: '19',
    name: 'Salsabila Nuraini',
    nis: 223464,
    parent: 'Nur Hidayat',
    phone: '082901234567',
    class: 'XI B',
    address: 'Jakarta, Jl. Sudirman No. 14',
  },
  {
    id: '20',
    name: 'Zaky Alfarizi',
    nis: 123466,
    parent: 'Fariz Anwar',
    phone: '081345678910',
    class: 'XII C',
    address: 'Yogyakarta, Jl. Kaliurang No. 20',
  },
] satisfies Siswa[];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Halaman Guru</Typography>
          <Breadcrumbs className="breadcrumbs">
            <Link href="/dashboard">Dashboard</Link>
            <Typography color="text.primary">Guru</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <FilterGuru />
      <TableGuru data={dataSiswaDummy} columns={siswaColumns} />
    </Stack>
  );
}
