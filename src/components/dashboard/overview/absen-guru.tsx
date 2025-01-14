'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SignIn as SignInIcon } from '@phosphor-icons/react/dist/ssr/SignIn';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { Button, Modal, Box } from '@mui/material';

import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/use-user';
// Gunakan dynamic import agar komponen peta hanya di-render di client side
const MapWithMarker = dynamic(() => import('../modal/map-with-marker'), {
  ssr: false, // Nonaktifkan SSR untuk komponen peta
});

export interface AbsensiGuruProps {
  sx?: SxProps;
  isCheckin: boolean;
}

// Styling container Modal
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export function AbsensiGuru({ sx, isCheckin }: AbsensiGuruProps): React.JSX.Element {
  const [openModal, setOpenModal] = React.useState(false);
  const [position, setPosition] = React.useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [loadingPosition, setLoadingPosition] = React.useState<boolean>(false);
  const { user }: any = useUser();

  const handleOpenModal = async () => {
    setLoadingPosition(true);

    // Mendapatkan lokasi user via Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setLoadingPosition(false);
          setOpenModal(true);
        },
        (error) => {
          console.error('Error get location:', error);
          setLoadingPosition(false);
          // Bisa tambahkan alert atau snackbar disini
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
      setLoadingPosition(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('custom-auth-token');

    const payload = {
      longitude: position.lng.toString(),
      latitude: position.lat.toString(),
      username: user.username,
      flag: isCheckin ? 'check-in' : 'check-out'
    };
    console.log("🚀 ~ handleConfirm ~ payload:", payload)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/attendances/absen-guru`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',Authorization: `${token}` },
        body: JSON.stringify(payload),
      });

      console.log("🚀 ~ handleConfirm ~ response:", response)
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Jika berhasil, tutup modal
      setOpenModal(false);
      alert(`Berhasil ${isCheckin ? 'Check-In' : 'Check-Out'}!`);
    } catch (error) {
      console.error(error);
      alert('Gagal mengirim data absensi');
    }
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {isCheckin ? 'ABSENSI MASUK' : 'ABSENSI KELUAR'}
              </Typography>
              <Typography variant="subtitle1">
                {isCheckin ? 'Belum Absen Masuk' : 'Belum Absen Keluar'}
              </Typography>
            </Stack>

            {isCheckin ? (
              <Avatar
                sx={{
                  backgroundColor: 'var(--mui-palette-success-main)',
                  height: '56px',
                  width: '56px',
                }}
              >
                <SignInIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  backgroundColor: 'var(--mui-palette-error-main)',
                  height: '56px',
                  width: '56px',
                }}
              >
                <SignOutIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            )}
          </Stack>

          <Button
            variant="contained"
            onClick={handleOpenModal}
            disabled={loadingPosition}
          >
            {loadingPosition
              ? 'Mengambil Lokasi...'
              : isCheckin
              ? 'Check-In'
              : 'Check-Out'}
          </Button>
        </Stack>
      </CardContent>

      {/* Modal untuk menampilkan peta dan konfirmasi */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Konfirmasi {isCheckin ? 'Check-In' : 'Check-Out'}
          </Typography>

          {/* Contoh menampilkan komponen peta */}
          <Box sx={{ width: '100%', height: 300, mb: 2 }}>
            <MapWithMarker position={position} />
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="contained" onClick={handleConfirm}>
              Konfirmasi
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
}
