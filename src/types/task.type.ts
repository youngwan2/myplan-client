export interface Task {
  id?: number;
  title: string;
  description?: string; // Make it optional
  colorCode: string;
  startTime: string | number;
  endTime: string | number;
  createdAt?: string;
}
