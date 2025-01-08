import React from 'react';
import { Card } from '@mui/material';

import type { ErrorDisplayTableProps } from '@/types/dashboard';

const ddefaultMessage = 'Gagal Menampilkan Data, Silahkan Hubungi Developer';

export default function ErrorDisplayTable(props: ErrorDisplayTableProps): React.JSX.Element {
  const { errorMessage } = props;
  return (
    <Card className="error-display-table">
      <p>{errorMessage || ddefaultMessage}</p>
    </Card>
  );
}
