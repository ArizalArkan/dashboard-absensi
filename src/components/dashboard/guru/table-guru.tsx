'use client';

import * as React from 'react';
import { WhatsApp } from '@mui/icons-material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { type EnhancedTableHeadGuru, type Guru, type Order, type TableGuruProps } from '@/types/guru';

const descendingComparator = <Key extends keyof Guru>(a: Guru, b: Guru, orderBy: Key): number => {
  const aValue = a[orderBy] ?? '';
  const bValue = b[orderBy] ?? '';

  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
};

function getComparator<Key extends keyof Guru>(order: Order, orderBy: Key): (a: Guru, b: Guru) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props: EnhancedTableHeadGuru): React.ReactElement {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property: keyof Guru) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function TableGuru(props: TableGuruProps): React.JSX.Element {
  const { rowsPage = 10, data = [], columns } = props; // Default values for `data` and `rowsPage`
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPage);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Guru): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    (): Guru[] =>
      Array.isArray(data)
        ? [...data]
            .sort(getComparator(order, orderBy as keyof Guru))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [data, order, orderBy, page, rowsPerPage]
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead columns={columns} onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={row?._id || index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.username || '-'}</TableCell>
                  <TableCell>{row?.nip || '-'}</TableCell>
                  <TableCell>{row?.phone || '-'}</TableCell>
                  <TableCell>
                    <div className="action-table">
                      <Button
                        className="edit"
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<EditRoundedIcon />}
                      >
                        Edit
                      </Button>
                      <Button className="delete" size="small" variant="contained" startIcon={<DeleteRoundedIcon />}>
                        Hapus
                      </Button>
                      <Button className="whatsapp" size="small" variant="contained" startIcon={<WhatsApp />}>
                        WA
                      </Button>
                      <Button className="card" size="small" variant="contained" startIcon={<CreditCardRoundedIcon />}>
                        Kartu
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Card>
  );
}