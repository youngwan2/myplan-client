import { Value } from './lib.type';
import { Task } from './task.type';

export interface PlanHeaderPropsType {
  onDateChange: (date: Value) => void;
}

export interface PlanWriteFormModalPropsType {
  onClose: () => void;
  onSubmit: (task: Task) => void;
  isLoading?: boolean;
}

export interface PlanFooterPropsType {
  onOpenForm: () => void;
  tasks?: Task[] | null;
}
