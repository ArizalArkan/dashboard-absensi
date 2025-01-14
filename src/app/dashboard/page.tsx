'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { useUser } from '@/hooks/use-user';
import { AbsensiGuru } from '@/components/dashboard/overview/absen-guru';
import { Grup } from '@/components/dashboard/overview/grup-kontak';
import { Guru } from '@/components/dashboard/overview/guru';
import { Kelas } from '@/components/dashboard/overview/kelas';
import { Sales } from '@/components/dashboard/overview/sales';
import { Siswa } from '@/components/dashboard/overview/siswa';

export default function Page(): React.JSX.Element {
  const { user }: any = useUser();
  const role = user?.role;

  return (
    <>
      {role === 'guru' && (
        <>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Absensi Guru
          </Typography>
          <Grid container spacing={3}>
            <Grid lg={3} sm={6} xs={12}>
              <AbsensiGuru sx={{ height: '100%' }} isCheckin />
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
              <AbsensiGuru sx={{ height: '100%' }} isCheckin={false} />
            </Grid>
          </Grid>
        </>
      )}
      <Typography variant="h5" sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Dashboard Informasi
      </Typography>
      <Grid container spacing={3}>
        {/* ... contoh komponen lain ... */}
        <Grid lg={3} sm={6} xs={12}>
          <Siswa sx={{ height: '100%' }} value="5" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Kelas sx={{ height: '100%' }} value="3" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Guru sx={{ height: '100%' }} value="2" />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <Grup sx={{ height: '100%' }} value="1" />
        </Grid>
        <Grid lg={8} xs={12}>
          <Sales
            chartSeries={[
              { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
              { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        {/* ... dan seterusnya ... */}
      </Grid>
    </>
  );
}
