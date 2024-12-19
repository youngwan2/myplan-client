import { toast } from 'react-toastify';
import { client } from '../configs/axios.config';
import { LoginUser, SignupUser } from '../types/user.type';
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
const loginUser = async (user: LoginUser): Promise<boolean> => {
  const id = toast.loading('로그인 중...');
  try {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);

    const response = await client.post('/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    localStorage.setItem('Authorization', response.headers['authorization']);

    toast.success('로그인 성공!');
    return true;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error(
        error.response
          ? '아이디 혹은 비밀번호이 일치하지 않거나 존재하지 않는 계정 입니다. 확인 후 다시시도 해주세요.'
          : '서버 에러: ' + error.message,
      );
    }
    return false;
  } finally {
    toast.dismiss(id);
  }
};

export { registerUser, loginUser };
