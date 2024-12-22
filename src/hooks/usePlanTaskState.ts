import { useCallback } from 'react';
import { validateTask } from '../services/planService';

import { toast } from 'react-toastify';
import { Task } from '../types/task.type';
import { useAddTaskMutation } from './mutations/useTaskMutation';
import useTaskByPlanIdQuery from './queries/useTaskQuery';

export function usePlanTaskState(planId?: string) {
  const { data: tasks, isLoading, isError } = useTaskByPlanIdQuery(planId);
  const { mutate: addTaskMutate } = useAddTaskMutation(planId);

  // 작업 추가
  const handleAddTask = useCallback(
    (newTask: Task) => {
      if (!tasks || !planId) return;

      try {
        validateTask(tasks, newTask);
        addTaskMutate({ planId, task: newTask });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
    [tasks],
  );

  return {
    tasks,
    isLoading,
    isError,
    handleAddTask,
  };
}
