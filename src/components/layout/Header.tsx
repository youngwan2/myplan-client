// interface PropsType { }

import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="flex justify-between border-b-2 max-w-[768px]">
      <h1>
        <Link to="/">나의플랜</Link>
      </h1>
    </header>
  );
}
