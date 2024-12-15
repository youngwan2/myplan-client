import React, { useState, useEffect } from 'react';
import useLoginForm from '../customs/useLoginForm';
import { InputField } from '../components/common/InputField';
import { useNavigate } from 'react-router';

// Login Component
export default function LoginPage() {
  const { formData, errors, isFormValid, handleChange } = useLoginForm();
  const [isRememberEmail, setIsRememberEmail] = useState(false);
  const router = useNavigate();

  // 로컬 스토리지에서 이메일을 불러오는 로직
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      handleChange({ target: { name: 'email', value: savedEmail } });
      setIsRememberEmail(true);
    }
  }, [handleChange]);

  // 이메일 체크박스 상태 변경 시 처리
  const handleRememberEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsRememberEmail(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('email'); // 체크 해제 시 로컬 스토리지에서 이메일 제거
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('로그인 성공', formData);

      // 이메일을 로컬 스토리지에 저장
      if (isRememberEmail) {
        localStorage.setItem('email', formData.email);
      }
    } else {
      console.log('폼 검증 실패');
    }
  };

  const handleSignUpRedirect = () => {
    router('/sign-up'); // 회원가입 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <div className="flex items-center">
            <input
              id="rememberEmail"
              name="rememberEmail"
              type="checkbox"
              checked={isRememberEmail}
              onChange={handleRememberEmailChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberEmail"
              className="ml-2 block text-sm text-gray-900"
            >
              이메일 저장
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              로그인
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleSignUpRedirect}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
