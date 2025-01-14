'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  username: zod.string().min(1, { message: 'Username is required' }),
  password: zod.string().min(1, { message: 'Password is required' }),
  role: zod
    .string()
    .refine((value) => value === '' || ['petugas', 'admin'].includes(value), {
      message: 'Role is required',
    }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', password: '', role: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const visitor = searchParams.get('visitor');
  const isVisitorGuru = visitor === 'guru';

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        const { error } = await authClient.signInEndpoint(values, isVisitorGuru);

        if (error) {
          setError('root', { type: 'server', message: error });
          setIsPending(false);
          return;
        }

        // Refresh the auth state
        await checkSession?.();

        // UserProvider, for this case, will not refresh the router
        // After refresh, GuestGuard will handle the redirect
        router.refresh();
      } catch (err) {
        setError('root', { type: 'server', message: 'Something went wrong, please try again.' });
      } finally {
        setIsPending(false);
      }
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">{isVisitorGuru ? 'Masuk Dashboard Guru' : 'Masuk Dashboard Master'}</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>Username</InputLabel>
                <OutlinedInput {...field} label="Username" />
                {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {!isVisitorGuru && (
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <FormControl error={Boolean(errors.role)}>
                  <InputLabel>Role</InputLabel>
                  <Select {...field} label="Role">
                    <MenuItem value="" disabled>
                      Pilih Role
                    </MenuItem>
                    <MenuItem value="petugas">Petugas</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  {errors.role ? <FormHelperText>{errors.role.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          )}
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Masuk
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
