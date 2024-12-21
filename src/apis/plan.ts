import { client } from '../configs/axios.config';
import ApiResponseError from '../exception/apiResponseError';
import { ApiPath } from './apis';

// POST: 플랜 추가
export const addPlan = async (planDate: { planDate: string }) => {
  try {
    const response = await client.post(ApiPath.PLAN.create(), planDate);
    return response.data.data;
  } catch (error) {
    // 에러를 그대로 전파하여 mutation의 onError에서 처리
    throw error;
  }
};

// GET: 모든 플랜 조회
export const getAllPlan = async () => {
  const response = await client.get(ApiPath.PLAN.base);
  return response.data.data;
};

// GET: 특정 날짜 플랜 조회
export const getPlanByDate = async (planDate?: string) => {
  if (!planDate) throw new ApiResponseError('플랜 날짜가 지정되지 않았습니다.');
  const response = await client.get(ApiPath.PLAN.getOne(planDate));
  return response.data.data;
};
