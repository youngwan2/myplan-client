import {
  validators,
  isOverlappingTaskTime,
  existingColorCode,
} from '../validationUtils';
import { Task } from '../../types/plan.type';

describe('validators', () => {
  describe('username validation', () => {
    it('should return error for empty username', () => {
      expect(validators.username('')).toBe('사용자 이름을 입력해주세요');
    });

    it('should return error for username less than 2 characters', () => {
      expect(validators.username('a')).toBe(
        '사용자 이름은 최소 2자 이상이어야 합니다',
      );
    });

    it('should return null for valid username', () => {
      expect(validators.username('john')).toBeNull();
    });
  });

  describe('email validation', () => {
    it('should return error for empty email', () => {
      expect(validators.email('')).toBe('이메일을 입력해주세요');
    });

    it('should return error for invalid email format', () => {
      expect(validators.email('invalid')).toBe('유효한 이메일 형식이 아닙니다');
      expect(validators.email('invalid@')).toBe(
        '유효한 이메일 형식이 아닙니다',
      );
      expect(validators.email('invalid@com')).toBe(
        '유효한 이메일 형식이 아닙니다',
      );
    });

    it('should return null for valid email', () => {
      expect(validators.email('test@example.com')).toBeNull();
    });
  });

  describe('password validation', () => {
    it('should return error for empty password', () => {
      expect(validators.password('')).toBe('비밀번호를 입력해주세요');
    });

    it('should return error for password less than 8 characters', () => {
      expect(validators.password('Ab1')).toBe(
        '비밀번호는 최소 8자 이상이어야 합니다',
      );
    });

    it('should return error for password without uppercase', () => {
      expect(validators.password('password123')).toBe(
        '대문자를 포함해야 합니다',
      );
    });

    it('should return error for password without number', () => {
      expect(validators.password('PasswordABC')).toBe('숫자를 포함해야 합니다');
    });

    it('should return null for valid password', () => {
      expect(validators.password('Password123')).toBeNull();
    });
  });

  describe('confirmPassword validation', () => {
    it('should return error for empty confirm password', () => {
      expect(validators.confirmPassword('password', '')).toBe(
        '비밀번호 확인을 입력해주세요',
      );
    });

    it('should return error for non-matching passwords', () => {
      expect(validators.confirmPassword('password1', 'password2')).toBe(
        '비밀번호가 일치하지 않습니다',
      );
    });

    it('should return null for matching passwords', () => {
      expect(validators.confirmPassword('password', 'password')).toBeNull();
    });
  });
});

describe('isOverlappingTaskTime', () => {
  const existingTask: Task = {
    id: 1,
    title: 'Existing Task',
    startTime: '10:00',
    endTime: '11:00',
    colorCode: '#000000',
  };

  it('should return false for empty task list', () => {
    const newTask: Task = {
      id: 2,
      title: 'New Task',
      startTime: '09:00',
      endTime: '10:00',
      colorCode: '#111111',
    };
    expect(isOverlappingTaskTime([], newTask)).toBeFalsy();
  });

  it('should return true for overlapping tasks', () => {
    const newTask: Task = {
      id: 2,
      title: 'New Task',
      startTime: '10:30',
      endTime: '11:30',
      colorCode: '#111111',
    };
    expect(isOverlappingTaskTime([existingTask], newTask)).toBeTruthy();
  });

  it('should return false for non-overlapping tasks', () => {
    const newTask: Task = {
      id: 2,
      title: 'New Task',
      startTime: '11:30',
      endTime: '12:30',
      colorCode: '#111111',
    };
    expect(isOverlappingTaskTime([existingTask], newTask)).toBeFalsy();
  });
});

describe('existingColorCode', () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      startTime: '10:00',
      endTime: '11:00',
      colorCode: '#000000',
    },
  ];

  it('should return true for existing color code', () => {
    expect(existingColorCode(tasks, '#000000')).toBeTruthy();
  });

  it('should return false for new color code', () => {
    expect(existingColorCode(tasks, '#111111')).toBeFalsy();
  });
});
