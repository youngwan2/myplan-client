interface Task {
  id?: number;
  title: string;
  description: string;
  colorCode: string;
  startTime: string | number;
  endTime: string | number;
  createdAt?: string;
}

interface Plan {
  id?: number;
  planDate: string;
  tasks?: Task[];
}

export type { Task, Plan };
