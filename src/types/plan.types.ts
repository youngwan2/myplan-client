import { Task } from './task.type';

export interface PlanHeaderPropsType {
  currentDate: string;
  selectedPlanDate?: string;
  localDateList: string[];
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
