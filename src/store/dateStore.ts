import { create } from 'zustand';
import { formatDate } from '../utils/formatUtil';

interface DateStore {
  currentDate: string;
  setDate: (newDate: string) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  currentDate: formatDate(new Date()), // 기본 값은 오늘 날짜
  setDate: (newDate) => set(() => ({ currentDate: newDate })),
}));
