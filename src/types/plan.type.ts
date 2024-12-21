import { Task } from './task.type';

export interface Plan {
  id?: number;
  planDate: string;
  tasks?: Task[];
  createAt?: string;
  updatedAt?: string;
}
