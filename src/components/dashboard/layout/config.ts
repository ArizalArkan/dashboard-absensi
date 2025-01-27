import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'dashboard', title: 'Dashboard', href: paths.dashboard.dashboard, icon: 'chart-pie' },
  { key: 'siswa', title: 'Siswa', href: paths.dashboard.siswa, icon: 'users' },
  { key: 'guru', title: 'Guru', href: paths.dashboard.guru, icon: 'users' },
  {
    key: 'siswa-sub',
    title: 'Test Sub',
    href: '',
    icon: 'users',
    subMenu: [
      { key: 'siswa', title: 'Siswa', href: paths.dashboard.siswa, icon: 'users' },
      { key: 'sub1', title: 'Sub 1', href: paths.dashboard.sub1, icon: 'users' },
      { key: 'guru', title: 'Guru', href: paths.dashboard.guru, icon: 'users' },
    ],
  },
  // { key: 'presensi', title: 'Presensi', href: paths.dashboard.presensi, icon: 'users' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
