import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type SubmitHandler } from 'react-hook-form';

export interface Siswa {
  no?: number;
  action?: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  nis: string;
  password: string;
  phone: number;
  role: string;
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

export interface FormSiswa {
  username: string;
  nis: string;
  phone: number;
  // password: string;
  // role: string;
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

export interface FilterSiswaProps {
  setOpenModalAdd: Dispatch<SetStateAction<boolean>>;
  pageName: string;
}

export interface ModalAddSiswaProps {
  open: boolean;
  handleClose: () => void;
  handleSubmitAdd: SubmitHandler<FormSiswa>;
  pageName: string;
}
