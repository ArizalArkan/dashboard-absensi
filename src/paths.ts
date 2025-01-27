export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    dashboard: '/dashboard',
    siswa: '/dashboard/siswa',
    sub1: '/dashboard/siswa/sub1',
    guru: '/dashboard/guru',
    presensi: '/dashboard/presensi',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
