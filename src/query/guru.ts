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

import { type Guru } from '@/types/guru';

interface UseGetGuru {
  data: Guru[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

// interface UseAddGuru {
//   data: any | undefined;
//   isLoading: boolean;
//   isError: boolean;
// }

interface AddGuruData {
  username: string;
  nip: string;
  password: string;
  phone: number;
  role: string;
}

export const useGetGuru = (): UseGetGuru => {
  const { data, isLoading, isError }: UseQueryResult<[]> = useQuery({
    queryKey: ['get_guru'],
    queryFn: async () => {
      const { data } = await axios.get<[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/attendances/guru-with-attendance`
      );
      return data;
    },
  });
  return { data, isLoading, isError };
};

export const useAddGuru = (): UseMutationResult<any, Error, AddGuruData> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/add-user-guru`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // @ts-expect-error
      queryClient.invalidateQueries('get_guru');
    },
  });

  // @ts-expect-error
  return mutation;
};
