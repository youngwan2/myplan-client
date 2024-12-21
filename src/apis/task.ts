import { client } from '../configs/axios.config';
import { Task } from '../types/task.type';
import { ApiPath } from './apis';

// GET: 작업 리스트 조회
export const getTasks = async (planId?: string) => {
  if (!planId) throw new Error('유효한 planId가 아닙니다.');
  const response = await client.get(ApiPath.TASK.base(planId));
  return response.data.data;
};

// POST: 작업 추가
export const addTask = async (planId: string, task: Task) => {
  const response = await client.post(ApiPath.TASK.create(planId), task);
  return response.data.data;
};

// PATCH: 작업 수정
export const updateTask = async (
  planId: string,
  taskId: string,
  task: Task,
) => {
  const response = await client.patch(
    ApiPath.TASK.update(planId, taskId),
    task,
  );
  return response.data.data;
};

// DELETE: 작업 삭제
export const deleteTask = async (planId: string, taskId: string) => {
  const response = await client.delete(ApiPath.TASK.delete(planId, taskId));
  return response.data.data;
};
