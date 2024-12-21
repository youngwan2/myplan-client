import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPlan } from '../../apis/plan';
import { toast } from 'react-toastify';
import ApiResponseError from '../../exception/apiResponseError';

export default function usePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlan,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
      toast.success('플랜이 생성되었습니다.');
    },
    onError: (err) => {
      if (err instanceof ApiResponseError) {
        // 400 에러도 포함하여 처리
        toast.error(err.response?.data?.message || '요청 처리 실패');
      } else {
        toast.error('알 수 없는 에러가 발생했습니다.');
      }
    },
  });
}
