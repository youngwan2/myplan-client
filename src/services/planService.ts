import { Plan } from '../types/plan.type';
import { Task } from '../types/task.type';
import {
  existingColorCode,
  isOverlappingTaskTime,
} from '../utils/validationUtils';

export class TaskValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskValidationError';
  }
}

/** 기존 작업의 색상, 시간이 새로운 작업과 겹치는지 검증 */
export function validateTask(tasks: Task[], newTask: Task) {
  if (existingColorCode(tasks, newTask.colorCode)) {
    throw new TaskValidationError(
      '기존에 사용된 색상입니다. 다른 색상을 선택해주세요.',
    );
  }
  if (isOverlappingTaskTime(tasks, newTask)) {
    throw new TaskValidationError('해당 시간에 이미 다른 작업이 있습니다.');
  }
}

/** 기존에 존재하는 플랜인지 검증 */
export function validatePlan(plan: Plan | undefined, addPlanDate: string) {
  if (plan) {
    return plan.planDate === addPlanDate;
  } else {
    return true;
  } // 네트워크 등 문제로 잘못 추가되는 것 방지
}
