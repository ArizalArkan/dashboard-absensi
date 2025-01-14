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
  
  export const useGetSetting = (): any => {
    const { data, isLoading, isError }: UseQueryResult<[]> = useQuery({
      queryKey: ['get_setting'],
      queryFn: async () => {
        const { data } = await axios.get<[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/settings/`
        );
        return data;
      },
    });
    return { data, isLoading, isError };
  };
  
  export const useUpdateSetting = (): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem('custom-auth-token');
  
    const mutation = useMutation({
      mutationFn: async (data) => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/settings/`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            }
          }
        );
        return response.data;
      },
      onSuccess: () => {
        // @ts-expect-error
        queryClient.invalidateQueries('get_setting');
      },
    });
  
    return mutation;
  };
  