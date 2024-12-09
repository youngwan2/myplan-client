import { client } from '../configs/axios.config';

// 플랜 추가
export const addPlan = async () => {
  const response = await client.post('/api/plans');

  console.log(response);
};
