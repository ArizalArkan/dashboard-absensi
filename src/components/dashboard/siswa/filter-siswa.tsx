/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SearchIcon from '@mui/icons-material/Search';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Stack } from '@mui/system';

export function FilterSiswa(props: { setOpenModalAdd: any }): React.JSX.Element {
  const { setOpenModalAdd } = props;

  const handleDownload = (): void => {
    window.open(
      'https://server-absensi-production.up.railway.app/api/attendances/siswa-with-attendance?export=excel',
      '_blank'
    );
  };

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
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpenModalAdd(true)}
          >
            Tambah Siswa
          </Button>
          <Button color="inherit" startIcon={<UploadRoundedIcon />}>
            Import
          </Button>
          <Button color="inherit" startIcon={<DownloadRoundedIcon />} onClick={handleDownload}>
            Download
          </Button>
          <Button color="inherit" startIcon={<FilterAltRoundedIcon />}>
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
            <SearchIcon />
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
