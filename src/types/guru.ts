import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { type SubmitHandler } from 'react-hook-form';

export interface Guru {
  no?: number;
  action?: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  nip: string;
  password: string;
  phone: number;
  role: string;
}

export interface TableGuruProps {
  rowsPage?: number;
  data: Guru[];
  columns: GuruColumns[];
}

export interface FormGuru {
  username: string;
  nip: string;
  phone: number;
  // password: string;
  // role: string;
}

export interface GuruColumns {
  id: keyof Guru;
  label: string;
  numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableHeadGuru {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Guru) => void;
  order: Order;
  orderBy: string;
  columns: GuruColumns[];
}

export interface FilterGuruProps {
  setOpenModalAdd: Dispatch<SetStateAction<boolean>>;
  pageName: string;
}

export interface ModalAddGuruProps {
  open: boolean;
  handleClose: () => void;
  handleSubmitAdd: SubmitHandler<FormGuru>;
  pageName: string;
}
