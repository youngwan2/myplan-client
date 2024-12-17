import useSignUpForm from '../hooks/useSignUpForm';
import { useNavigate } from 'react-router';
import { InputField } from '../components/common/InputField';
import Button from '../components/common/Button';

import { registerUser } from '../apis/auth';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { errors, formData, handleChange, isFormValid } = useSignUpForm();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const { username, email, password } = formData;
      const isSuccess = await registerUser({ username, email, password });

      if (isSuccess) {
        navigate('/login');
      } else {
      }
    } else {
      toast.error('폼 검증 실패');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[540px] w-full space-y-8 bg-white p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            label="사용자 이름"
            placeholder="사용자 이름을 입력하세요"
          />
          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            label="이메일"
            placeholder="이메일을 입력하세요"
          />
          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
          />
          <div>
            <Button isFormValid={isFormValid} textContent="회원가입" />
          </div>
        </form>
      </div>
    </div>
  );
}
