import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../apis/task';
import { Task } from '../../types/task.type';

export default function useTaskByPlanIdQuery(planId?: string) {
  const { data, isError, error, isLoading } = useQuery<Task[]>({
    queryKey: ['task', planId],
    queryFn: () => getTasks(planId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
