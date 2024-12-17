import React, { useState, useEffect, FormEvent } from 'react';
import useLoginForm from '../hooks/useLoginForm';
import { InputField } from '../components/common/InputField';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';
import { loginUser } from '../apis/auth';

export default function LoginPage() {
  const { formData, errors, isFormValid, handleChange } = useLoginForm();
  const [isRememberUsername, setIsRememberUsername] = useState(false);
  const navigate = useNavigate();

  // 유저네임 체크박스 상태 변경 시 처리
  const handleRememberUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsRememberUsername(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('username'); // 체크 해제 시 로컬 스토리지에서 유저네임 제거
    }
  };

  // 로그인 요청
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // 유저네임을 로컬 스토리지에 저장
      if (isRememberUsername) {
        localStorage.setItem('username', formData.username);
      }

      const result = await loginUser(formData);

      if (result) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        navigate(`/plan/${year}-${month}-${day}`);
      }
    } else {
      console.log('폼 검증 실패');
    }
  };

  // 회원가입 페이지로 이동
  const handleSignUpRedirect = () => {
    navigate('/sign-up');
  };

  // 로컬 스토리지에서 유저네임을 불러오는 로직
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      handleChange({ target: { name: 'username', value: savedUsername } });
      setIsRememberUsername(true);
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
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            label="아이디"
            placeholder="아이디(username)를 입력하세요"
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
              id="rememberUsername"
              name="rememberUsername"
              type="checkbox"
              checked={isRememberUsername}
              onChange={handleRememberUsernameChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberUsername"
              className="ml-2 block text-sm text-gray-900"
            >
              아아디 저장
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
