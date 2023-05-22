import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import ApiService from '../service';
import { ApiError, DataRes } from '../types';

export const useDataQuery = (): UseQueryResult<DataRes, ApiError> => {
  return useQuery<DataRes, ApiError, DataRes, string[]>({
    queryKey: ['data'],
    queryFn: async () => await ApiService.getData(),
    onError(err: ApiError) {
      err.error = 'Sorry but we could not find the details for you';
    },
  });
};

export const useDataMutation = (): UseMutationResult<
  DataRes,
  ApiError,
  DataRes,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: DataRes) => await ApiService.updateData(data),
    {
      onMutate: async (data: DataRes) => {
        await queryClient.cancelQueries({ queryKey: ['data'] });
        queryClient.setQueryData(['data'], {
          data,
        });

        return data;
      },
      onError(err: ApiError) {
        err.error = 'Sorry but we could not find the details for you';
      },
      onSuccess: () => {
        console.log('Success');
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(['data']);
      },
    }
  );
};
