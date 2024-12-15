import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  function login() {
    console.log('로그인 성공');
    // setUser(userInfo)
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      <ToastContainer position="top-center" />
    </AuthContext.Provider>
  );
}
