import * as React from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Stack } from '@mui/system';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

export function SiswaFilters(): React.JSX.Element {
  return (
    <Card
      sx={{ p: 2 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Tambah Siswa
          </Button>
          <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
            Import
          </Button>
          <Button color="inherit" startIcon={<LocalPrintshopOutlinedIcon />}>
            Cetak
          </Button>
          <Button color="inherit" startIcon={<FilterAltOutlinedIcon />}>
            Filter
          </Button>
        </Stack>
      </div>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Cari siswa..."
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '300px' }}
        style={{
          height: '45px',
        }}
      />
    </Card>
  );
}
