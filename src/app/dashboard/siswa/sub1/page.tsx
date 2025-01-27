import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const pageName = 'Sub1';
export default function Page(): React.JSX.Element {
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
    </Stack>
  );
}
