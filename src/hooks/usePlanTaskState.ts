import { useState, useCallback } from 'react';
import { validateTask } from '../services/planService';
import { formatDate } from '../utils/formatUtil';
import { Value } from '../types/lib.type';
import { toast } from 'react-toastify';
import { Task } from '../types/task.type';
import { useAddTaskMutation } from './mutations/useTaskMutation';
import useTaskByPlanIdQuery from './queries/useTaskQuery';

export function usePlanTaskState(
  initialDate: Date = new Date(),
  planId?: string,
) {
  const [planDate, setPlanDate] = useState(formatDate(initialDate));
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

  // 날짜 변경
  const handleDateChange = useCallback((date: Value) => {
    if (date) {
      setPlanDate(formatDate(new Date(date.toString())));
    }
  }, []);

  return {
    planDate,
    tasks,
    isLoading,
    isError,
    handleAddTask,
    handleDateChange,
  };
}
