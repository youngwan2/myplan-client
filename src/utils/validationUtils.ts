import { Task } from '../types/plan.type';

// 유효성 체크 => 필요에 따라 확장 가능
export const validators = {
  username: (value: string) => {
    if (!value) return '사용자 이름을 입력해주세요';
    if (value.length < 2) return '사용자 이름은 최소 2자 이상이어야 합니다';
    return null;
  },
  email: (value: string) => {
    if (!value) return '이메일을 입력해주세요';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '유효한 이메일 형식이 아닙니다';
    return null;
  },
  password: (value: string) => {
    if (!value) return '비밀번호를 입력해주세요';
    if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다';
    if (!/[A-Z]/.test(value)) return '대문자를 포함해야 합니다';
    if (!/[0-9]/.test(value)) return '숫자를 포함해야 합니다';
    return null;
  },
  confirmPassword: (password: string, confirmPassword: string) => {
    if (!confirmPassword) return '비밀번호 확인을 입력해주세요';
    if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다';
    return null;
  },
};

/** 시간을 "HH:mm" 문자열로 입력받고, Date 객체로 변환 */
const parseTime = (time: string | number) => {
  const [hours, minutes] = time.toString().split(':').map(Number);
  const date = new Date();

  date.setHours(hours, minutes, 0, 0);
  return date;
};

/** 등록할 작업이 기존 작업과 시간이 겹치는지 검증 */
export const isOverlappingTaskTime = (tasks: Task[], newTask: Task) => {
  if (tasks.length < 1) return false;

  const newTaskStartTime = parseTime(newTask.startTime);
  const newTaskEndTime = parseTime(newTask.endTime);

  // 기존 task 중 하나라고 새 task와 겹치면 true
  return tasks.some((task: Task) => {
    const existingTaskStartTime = parseTime(task.startTime);
    const existingTaskEndTime = parseTime(task.endTime);

    return (
      newTaskStartTime < existingTaskEndTime &&
      newTaskEndTime > existingTaskStartTime &&
      newTaskStartTime < existingTaskEndTime
    );
  });
};

/** 기존에 사용중인 색상이라면 true */
export const existingColorCode = (tasks: Task[], newColorCode: string) => {
  return tasks.some((task) => task.colorCode === newColorCode);
};
