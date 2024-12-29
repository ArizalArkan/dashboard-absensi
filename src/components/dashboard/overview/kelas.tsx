import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { UsersThree as KelasIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';

export interface KelasProps {
  sx?: SxProps;
  value: string;
}

export function Kelas({ sx, value }: KelasProps): React.JSX.Element {

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Kelas
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              <KelasIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
            <Stack sx={{ alignItems: 'center', justifyContent:'center' }} direction="row" spacing={2}>
              <Typography color="text.secondary" variant="caption">
                SELENGKAPNYA
              </Typography>
            </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
