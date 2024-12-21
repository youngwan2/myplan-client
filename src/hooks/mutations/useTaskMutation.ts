import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../configs/react-query.config';
import { addTask, deleteTask, updateTask } from '../../apis/task';
import { Task } from '../../types/task.type';

// 작업 추가
export function useAddTaskMutation(planId?: string | null) {
  return useMutation({
    mutationFn: ({ planId, task }: { planId: string; task: Task }) =>
      addTask(planId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', planId] });
    },
  });
}

// 작업 수정
export function useUpdateTaskMutation(planId?: string | null) {
  return useMutation({
    mutationFn: ({
      planId,
      taskId,
      task,
    }: {
      planId: string;
      taskId: string;
      task: Task;
    }) => updateTask(planId, taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', planId] });
    },
  });
}

// 작업 삭제
export function useDeleteTaskMutation(planId?: string | null) {
  return useMutation({
    mutationFn: ({ planId, taskId }: { planId: string; taskId: string }) =>
      deleteTask(planId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', planId] });
    },
  });
}
