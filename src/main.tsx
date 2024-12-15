import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import SignUp from './pages/SignUp.tsx';
import LoginPage from './pages/LoginPage.tsx';
import PlanPage from './pages/PlanPage.tsx';
import AuthLayout from './components/pages/auth-page/AuthLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/plan/:dueDate" element={<PlanPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
