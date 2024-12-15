interface PropsType {
  children: ReactNode;
}

import { ReactNode } from 'react';

export default function PlanMain({ children }: PropsType) {
  return <div className="justify-center flex py-5 px-4">{children}</div>;
}
