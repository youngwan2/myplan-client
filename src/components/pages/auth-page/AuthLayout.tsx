// interface PropsType { }

import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="max-w-[768px] w-full h-[100vh] mx-auto">
      <Outlet />
    </div>
  );
}
