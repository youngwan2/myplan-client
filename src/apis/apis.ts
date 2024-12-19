export class ApiPath {
  private static readonly BASE_URL = '/api';

  public static readonly PLAN = {
    base: `${ApiPath.BASE_URL}/plans`,
    getOne: (id: string) => `${ApiPath.BASE_URL}/plans/${id}`,
    create: () => `${ApiPath.BASE_URL}/plans`,
    update: (id: string) => `${ApiPath.BASE_URL}/plans/${id}`,
    delete: (id: string) => `${ApiPath.BASE_URL}/plans/${id}`,
  };

  public static readonly TASK = {
    base: (planId: string) => `${ApiPath.BASE_URL}/plans/${planId}/tasks`,
    getOne: (planId: string, taskId: string) =>
      `${ApiPath.BASE_URL}/plans/${planId}/tasks/${taskId}`,
    create: (planId: string) => `${ApiPath.BASE_URL}/plans/${planId}/tasks`,
    update: (planId: string, taskId: string) =>
      `${ApiPath.BASE_URL}/plans/${planId}/tasks/${taskId}`,
    delete: (planId: string, taskId: string) =>
      `${ApiPath.BASE_URL}/plans/${planId}/tasks/${taskId}`,
  };

  public static readonly AUTH = {
    login: '/login',
    register: `${ApiPath.BASE_URL}/auth/register`,
    logout: `${ApiPath.BASE_URL}/auth/logout`,
  };
}
