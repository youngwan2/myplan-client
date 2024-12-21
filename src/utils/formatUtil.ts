import { Task } from '../types/task.type';
import { calculateDegree } from './mathUtil';

// Task 포맷 변경
export const formatTaskDateToDegree = (tasks?: Task[]) => {
  if (!Array.isArray(tasks)) return [];
  return tasks.map((task) => {
    const [startHour, startMinute] = task.startTime.toString().split(':');
    const [endHour, endMinute] = task.endTime.toString().split(':');
    const startTimeDegree = calculateDegree(
      Number(startHour),
      Number(startMinute),
      '24',
    );
    const endTimeDegree = calculateDegree(
      Number(endHour),
      Number(endMinute),
      '24',
    );

    return { ...task, startTime: startTimeDegree, endTime: endTimeDegree };
  });
};

// 날짜 포맷 변경: HH:mm
export const formatTime = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, '0'); // 2자리로 맞추기
  const minutes = time.getMinutes().toString().padStart(2, '0'); // 2자리로 맞추기
  return `${hours}:${minutes}`;
};

// 날짜 포맷 변경: HH:mm
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 2자리로 맞추기
  const day = date.getDate().toString().padStart(2, '0'); // 2자리로 맞추기
  return `${year}-${month}-${day}`;
};
