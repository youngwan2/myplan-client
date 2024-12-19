import { client } from '../configs/axios.config';
import { Task } from '../types/plan.type';
import { ApiPath } from './apis';

// POST: 플랜 추가
export const addPlan = async (planDate: string) => {
  const response = await client.post(ApiPath.PLAN.create(), planDate);

  console.log(response);
};

// POST: 작업 추가
export const addTask = async (planId: string, task: Task) => {
  const response = await client.post(ApiPath.TASK.create(planId), task);
  console.log(response);
};
