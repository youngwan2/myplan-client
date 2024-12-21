import { useQuery } from '@tanstack/react-query';
import { defaultQueryKeys } from '../../const/query-key';
import { getAllPlan, getPlanByDate } from '../../apis/plan';
import { Plan } from '../../types/plan.type';

/** 모든 플랜 조회 */
export function useAllPlanQuery() {
  const { data, error, isError, isLoading } = useQuery<Plan[]>({
    queryKey: defaultQueryKeys.plan,
    queryFn: getAllPlan,
  });

  return { data, error, isError, isLoading };
}

/** 날짜별 고유 플랜 조회 */
export function usePlanByPlanDateQuery(planDate?: string) {
  const { data, error, isError, isLoading } = useQuery<Plan>({
    queryKey: [...defaultQueryKeys.plan, planDate],
    queryFn: () => getPlanByDate(planDate),
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
}
