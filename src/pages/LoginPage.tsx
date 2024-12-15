import React, { useState, useEffect } from 'react';
import useLoginForm from '../customs/useLoginForm';
import { InputField } from '../components/common/InputField';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';

// Login Component
export default function LoginPage() {
  const { formData, errors, isFormValid, handleChange } = useLoginForm();
  const [isRememberEmail, setIsRememberEmail] = useState(false);
  const router = useNavigate();

  // 이메일 체크박스 상태 변경 시 처리
  const handleRememberEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsRememberEmail(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('email'); // 체크 해제 시 로컬 스토리지에서 이메일 제거
    }
  };

  // 로그인 요청
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // 이메일을 로컬 스토리지에 저장
      if (isRememberEmail) {
        localStorage.setItem('email', formData.email);
      }
    } else {
      console.log('폼 검증 실패');
    }
  };

  // 회원가입 페이지로 이동
  const handleSignUpRedirect = () => {
    router('/sign-up');
  };

  // 로컬 스토리지에서 이메일을 불러오는 로직
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      handleChange({ target: { name: 'email', value: savedEmail } });
      setIsRememberEmail(true);
    }
  }, [handleChange]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8  p-8 rounded-xl ">
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
            <Button isFormValid={isFormValid} textContent="로그인" />
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
