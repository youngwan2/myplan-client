import { formatTaskDateToDegree, formatTime } from '../formatUtil';
import { Task } from '../../types/plan.type';

describe('formatTaskDateToDegree', () => {
  it('24시간 형식의 시간을 각도로 올바르게 변환해야 한다', () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        startTime: '06:00',
        endTime: '12:00',
        colorCode: '#000000',
      },
    ];

    const formattedTasks = formatTaskDateToDegree(tasks);

    // 6:00 = (6 * 60) * 0.25 = 90 degrees
    // 12:00 = (12 * 60) * 0.25 = 180 degrees
    expect(formattedTasks[0].startTime).toBe(90);
    expect(formattedTasks[0].endTime).toBe(180);
  });

  it('여러 개의 작업을 처리할 수 있어야 한다', () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        startTime: '00:00',
        endTime: '06:00',
        colorCode: '#000000',
      },
      {
        id: 2,
        title: 'Task 2',
        startTime: '18:00',
        endTime: '24:00',
        colorCode: '#111111',
      },
    ];

    const formattedTasks = formatTaskDateToDegree(tasks);

    expect(formattedTasks[0].startTime).toBe(0);
    expect(formattedTasks[0].endTime).toBe(90);
    expect(formattedTasks[1].startTime).toBe(270);
    expect(formattedTasks[1].endTime).toBe(360);
  });
});

describe('formatTime', () => {
  it('시간을 패딩과 함께 올바르게 포맷해야 한다', () => {
    const date = new Date(2024, 0, 1, 9, 5); // January 1, 2024, 09:05
    expect(formatTime(date)).toBe('09:05');
  });

  it('자정을 올바르게 처리해야 한다', () => {
    const date = new Date(2024, 0, 1, 0, 0); // January 1, 2024, 00:00
    expect(formatTime(date)).toBe('00:00');
  });

  it('정오를 올바르게 처리해야 한다', () => {
    const date = new Date(2024, 0, 1, 12, 30); // January 1, 2024, 12:30
    expect(formatTime(date)).toBe('12:30');
  });
});
