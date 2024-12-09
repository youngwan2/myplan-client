import { client } from '../configs/axios.config';
import { SignupUser } from '../types/user.type';

// 회원가입
const registerUser = async (user: SignupUser) => {
  const response = await client.post('/api/register', user);
  const data = response.data;
  console.log(data);
};

// 로그인
const loginUser = async (user: SignupUser) => {};
