'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useGetSetting, useUpdateSetting } from '@/query/setting';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

interface FormValues {
  schoolName: string;
  locationLongitude: number | string; // sementara gunakan string, nanti di-parse jadi number
  locationLatitude: number | string;
  attendanceRadius: number | string;
  startTime: string;
  endTime: string;
}

export function UpdatePasswordForm(): React.JSX.Element {
  // Ambil data dari hook
  const { data, isLoading, isError } = useGetSetting();
  const mutation = useUpdateSetting();
  
  // Inisialisasi react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // Bisa memberi defaultValues kosong di sini; selanjutnya kita isi melalui useEffect jika data sudah ada
    defaultValues: {
      schoolName: '',
      locationLongitude: '',
      locationLatitude: '',
      attendanceRadius: '',
      startTime: '',
      endTime: '',
    },
  });

  // Ketika `data` berubah (setelah fetch selesai), setel ulang nilai form
  React.useEffect(() => {
    if (data) {
      reset({
        schoolName: data.schoolName ?? '',
        locationLongitude: data.schoolLocation?.coordinates?.[0]?.toString() ?? '',
        locationLatitude: data.schoolLocation?.coordinates?.[1]?.toString() ?? '',
        attendanceRadius: data.attendanceRadius?.toString() ?? '',
        startTime: data.startTime ?? '',
        endTime: data.endTime ?? '',
      });
    }
  }, [data, reset]);

  // Fungsi saat form disubmit
  const onSubmit = async (formValues: FormValues) => {
    // Bentuk payload sesuai kebutuhan
    const payload = {
      schoolName: formValues.schoolName,
      schoolLocation: {
        type: 'Point',
        coordinates: [
          parseFloat(formValues.locationLongitude.toString()),
          parseFloat(formValues.locationLatitude.toString()),
        ],
      },
      attendanceRadius: parseFloat(formValues.attendanceRadius.toString()),
      startTime: formValues.startTime,
      endTime: formValues.endTime,
    };

    // Lakukan sesuatu dengan payload (misalnya kirim ke backend)
    const toastAdd = toast.loading('Sedang memproses update...', {
      position: 'bottom-right',
    });
    
        try {
          const response = await mutation?.mutateAsync(payload);
          toast.update(toastAdd, {
            render: 'Setting sekolah berhasil diupdate',
            type: 'success',
            isLoading: false,
            position: 'bottom-right',
            autoClose: 5000,
          });
          return response;
        } catch (error) {
          toast.update(toastAdd, {
            // @ts-expect-error
            render: `Setting gagal diupdate. ${error?.response?.data?.error || ''}`,
            type: 'error',
            isLoading: false,
            position: 'bottom-right',
            autoClose: 5000,
          });
        }
  };

  if (isLoading) {
    return <div>Memuat data...</div>;
  }

  if (isError) {
    return <div>Terjadi kesalahan saat memuat data.</div>;
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Update School Setting" title="School Settings" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 600 }}>
            {/* Nama Sekolah */}
            <Controller
              name="schoolName"
              control={control}
              rules={{ required: 'Nama sekolah wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.schoolName)}>
                  <InputLabel htmlFor="schoolName">Nama Sekolah</InputLabel>
                  <OutlinedInput
                    id="schoolName"
                    label="Nama Sekolah"
                    {...field}
                  />
                </FormControl>
              )}
            />

            {/* Longitude */}
            <Controller
              name="locationLongitude"
              control={control}
              rules={{ required: 'Longitude wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.locationLongitude)}>
                  <InputLabel htmlFor="locationLongitude">Longitude</InputLabel>
                  <OutlinedInput
                    id="locationLongitude"
                    label="Longitude"
                    {...field}
                  />
                </FormControl>
              )}
            />

            {/* Latitude */}
            <Controller
              name="locationLatitude"
              control={control}
              rules={{ required: 'Latitude wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.locationLatitude)}>
                  <InputLabel htmlFor="locationLatitude">Latitude</InputLabel>
                  <OutlinedInput
                    id="locationLatitude"
                    label="Latitude"
                    {...field}
                  />
                </FormControl>
              )}
            />

            {/* Radius */}
            <Controller
              name="attendanceRadius"
              control={control}
              rules={{ required: 'Radius wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.attendanceRadius)}>
                  <InputLabel htmlFor="attendanceRadius">Radius (Km)</InputLabel>
                  <OutlinedInput
                    id="attendanceRadius"
                    label="Radius (Km)"
                    {...field}
                  />
                </FormControl>
              )}
            />

            {/* Jam Masuk */}
            <Controller
              name="startTime"
              control={control}
              rules={{ required: 'Jam mulai masuk wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.startTime)}>
                  <InputLabel htmlFor="startTime">Jam Masuk (HH:mm)</InputLabel>
                  <OutlinedInput
                    id="startTime"
                    label="Jam Masuk (HH:mm)"
                    {...field}
                  />
                </FormControl>
              )}
            />

            {/* Jam Pulang */}
            <Controller
              name="endTime"
              control={control}
              rules={{ required: 'Jam pulang wajib diisi' }}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.endTime)}>
                  <InputLabel htmlFor="endTime">Jam Pulang (HH:mm)</InputLabel>
                  <OutlinedInput
                    id="endTime"
                    label="Jam Pulang (HH:mm)"
                    {...field}
                  />
                </FormControl>
              )}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
    <ToastContainer />
    </>
  );
}
