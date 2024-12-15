// interface PropsType { }

import { Link } from 'react-router';

export default function AuthLink() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4  z-10 text-center">
      <Link
        to={'/login'}
        className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition block"
      >
        로그인
      </Link>
      <Link
        to="/sign-up"
        className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition block"
      >
        회원가입
      </Link>
    </div>
  );
}
