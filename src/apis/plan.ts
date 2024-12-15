import { client } from '../configs/axios.config';

// 플랜 추가
export const addPlan = async (planDate: string) => {
  const response = await client.post('/api/plans', planDate);

  console.log(response);
};
