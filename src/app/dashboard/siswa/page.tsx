import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Siswa, SiswaColumns } from '@/types/siswa';
import { config } from '@/config';
import { SiswaFilters } from '@/components/dashboard/customer/siswa-filters';
import { TableSiswa } from '@/components/dashboard/customer/table-siswa';

export const metadata = { title: `Siswa | Dashboard | ${config.site.name}` } satisfies Metadata;

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
    numeric: true,
    label: 'Kelas',
  },
  {
    id: 'address',
    numeric: true,
    label: 'Alamat',
  },
];

const dataSiswaDummy = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Aryasatya Pratama Wijaya',
    nis: 123456,
    parent: 'Aditya Santoso',
    phone: '081234567890',
    class: 'XII A',
    address: 'Jakarta, Jl. Merdeka No. 10',
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Mahendra Aditya Prakoso',
    nis: 123457,
    parent: 'Prasetyo Nugroho',
    phone: '081345678901',
    class: 'X B',
    address: 'Bandung, Jl. Sukajadi No. 25',
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Naufal Rizky Pratama',
    nis: 123458,
    parent: 'Rendra Wijaya',
    phone: '081456789012',
    class: 'XI C',
    address: 'Surabaya, Jl. Pahlawan No. 17',
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Arunika Cahya Putri',
    nis: 223456,
    parent: 'Rahmat Hidayat',
    phone: '082123456789',
    class: 'XII B',
    address: 'Yogyakarta, Jl. Malioboro No. 5',
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Kirana Ayu Permata',
    nis: 223457,
    parent: 'Surya Putra',
    phone: '082234567890',
    class: 'XI A',
    address: 'Semarang, Jl. Pemuda No. 8',
  },
  {
    id: '6',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Cendana Ratri Anindya',
    nis: 223458,
    parent: 'Bimo Setiawan',
    phone: '082345678901',
    class: 'X C',
    address: 'Malang, Jl. Ijen No. 3',
  },
  {
    id: '7',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Bagas Dwi Saputra',
    nis: 123459,
    parent: 'Dedi Saputra',
    phone: '081567890123',
    class: 'XI B',
    address: 'Bogor, Jl. Pajajaran No. 12',
  },
  {
    id: '8',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Fahri Zain Hakim',
    nis: 123460,
    parent: 'Hadi Hakim',
    phone: '081678901234',
    class: 'XII C',
    address: 'Medan, Jl. Gatot Subroto No. 18',
  },
  {
    id: '9',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Aulia Zahra Putri',
    nis: 223459,
    parent: 'Fajar Putra',
    phone: '082456789012',
    class: 'X A',
    address: 'Depok, Jl. Margonda Raya No. 22',
  },
  {
    id: '10',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Indira Maharani',
    nis: 223460,
    parent: 'Hendra Wijaya',
    phone: '082567890123',
    class: 'XII D',
    address: 'Palembang, Jl. Demang Lebar No. 7',
  },
  {
    id: '11',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Raka Febrianto',
    nis: 123461,
    parent: 'Febri Santoso',
    phone: '081789012345',
    class: 'XI D',
    address: 'Bali, Jl. Kuta No. 15',
  },
  {
    id: '12',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Anisa Fitriani',
    nis: 223461,
    parent: 'Budi Fitri',
    phone: '082678901234',
    class: 'XI E',
    address: 'Makassar, Jl. Pettarani No. 3',
  },
  {
    id: '13',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Galih Putra Pratama',
    nis: 123462,
    parent: 'Yudi Pratama',
    phone: '081890123456',
    class: 'X B',
    address: 'Malang, Jl. Veteran No. 2',
  },
  {
    id: '14',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Hafiz Ramadhan',
    nis: 123463,
    parent: 'Rizal Ramadhan',
    phone: '081901234567',
    class: 'XII E',
    address: 'Bandung, Jl. Braga No. 4',
  },
  {
    id: '15',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Laras Sekar Ayu',
    nis: 223462,
    parent: 'Adi Kurniawan',
    phone: '082789012345',
    class: 'X A',
    address: 'Bogor, Jl. Raya Cibinong No. 9',
  },
  {
    id: '16',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Iqbal Trianggoro',
    nis: 123464,
    parent: 'Trianggoro Saputra',
    phone: '081912345678',
    class: 'XI C',
    address: 'Surabaya, Jl. Darmo No. 10',
  },
  {
    id: '17',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Fikri Akbar Setiawan',
    nis: 123465,
    parent: 'Akbar Setiawan',
    phone: '081123456789',
    class: 'X B',
    address: 'Solo, Jl. Slamet Riyadi No. 8',
  },
  {
    id: '18',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Nabila Dwi Utami',
    nis: 223463,
    parent: 'Dwi Utomo',
    phone: '082890123456',
    class: 'XII A',
    address: 'Semarang, Jl. Pandanaran No. 11',
  },
  {
    id: '19',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Salsabila Nuraini',
    nis: 223464,
    parent: 'Nur Hidayat',
    phone: '082901234567',
    class: 'XI B',
    address: 'Jakarta, Jl. Sudirman No. 14',
  },
  {
    id: '20',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
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
          <Typography variant="h4">Siswa</Typography>
          <Breadcrumbs className="breadcrumbs">
            <Link href="/dashboard">Dashboard</Link>
            <Typography color="text.primary">Siswa</Typography>
          </Breadcrumbs>
        </Stack>
      </Stack>
      <SiswaFilters />
      <TableSiswa data={dataSiswaDummy} columns={siswaColumns} />
    </Stack>
  );
}
