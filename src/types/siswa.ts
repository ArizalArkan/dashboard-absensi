import type React from 'react';

// export interface Siswa {
//   no?: number;
//   id: string;
//   name: string;
//   nis: number;
//   parent: string;
//   phone: string;
//   class: string;
//   address: string;
//   action?: string;
// }

export interface Siswa {
  no?: number;
  action?: string;
  _id: string;
  __v: number;
  username: string;
  nis: string;
  password: string;
  phone: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  attendance: Attendance[];
}

export interface Attendance {
  _id: string;
  __v: number;
  username: {
    _id: string;
    role: string;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  flag: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TableSiswaProps {
  rowsPage?: number;
  data: Siswa[];
  columns: SiswaColumns[];
}

export interface SiswaColumns {
  id: keyof Siswa;
  label: string;
  numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableHead {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Siswa) => void;
  order: Order;
  orderBy: string;
  columns: SiswaColumns[];
}
