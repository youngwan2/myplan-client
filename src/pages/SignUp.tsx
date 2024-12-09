import React, { useState, useEffect } from 'react';
import useSignupForm from '../customs/useSignupForm';
import { InputField } from '../components/InputField';
import Button from '../components/Button';

export default function Signup() {
  const { errors, formData, handleChange, isFormValid } = useSignupForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // 회원가입 로직 구현 (예: API 호출)
      console.log('회원가입 성공', formData);
    } else {
      console.log('폼 검증 실패');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
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
