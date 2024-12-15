import { toast } from 'react-toastify';
import { client } from '../configs/axios.config';
import { SignupUser } from '../types/user.type';
import { AxiosError } from 'axios';

// 회원가입
const registerUser = async (user: SignupUser): Promise<boolean> => {
  const id = toast.loading('요청중...');
  try {
    await client.post('/api/auth/register', user);
    toast.success('회원가입 성공!');
    toast.dismiss(id);
    return true; // 성공 시 true
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(
        error.response
          ? error.response.data.message
          : '서버 에러: ' + error.message,
      );
      toast.dismiss(id);
    }

    return false;
  }
};

// 로그인
const loginUser = async (user: SignupUser) => {};

export { registerUser, loginUser };
