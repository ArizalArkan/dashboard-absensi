import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { FilterGuru } from '@/components/dashboard/guru/filter-guru';

// import { TableGuru } from '@/components/dashboard/guru/table-guru';

export const metadata = { title: `Guru | Dashboard | ${config.site.name}` } satisfies Metadata;

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
    </Stack>
  );
}
