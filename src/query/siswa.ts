/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';

import { type Siswa } from '@/types/siswa';

interface UseGetSiswa {
  data: Siswa[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

// interface UseAddSiswa {
//   data: any | undefined;
//   isLoading: boolean;
//   isError: boolean;
// }

interface AddSiswaData {
  username: string;
  nis: string;
  password: string;
  phone: string;
  role: string;
}

export const useGetSiswa = (): UseGetSiswa => {
  const { data, isLoading, isError }: UseQueryResult<[]> = useQuery({
    queryKey: ['get_siswa'],
    queryFn: async () => {
      const { data } = await axios.get<[]>(
        'https://server-absensi-production.up.railway.app/api/attendances/siswa-with-attendance'
      );
      return data;
    },
  });
  return { data, isLoading, isError };
};

export const useAddSiswa = (): UseMutationResult<any, Error, AddSiswaData> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        'https://server-absensi-production.up.railway.app/api/auth/add-user-siswa',
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries('get_siswa');
    },
  });

  // @ts-expect-error
  return mutation;
};
