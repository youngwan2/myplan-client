import { useState } from 'react';

import PlanFooter from '../components/plan-page/PlanFooter';
import PlanHeader from '../components/plan-page/PlanHeader';
import PlanMain from '../components/plan-page/PlanMain';
import PlanWriteForm from '../components/plan-page/PlanWriteForm';

export default function PlanPage() {
  const [isOpenWriteForm, setIsOpenWriteForm] = useState(false);

  function onClick() {
    setIsOpenWriteForm(!isOpenWriteForm);
  }

  return (
    <section className="max-w-[768px] w-full mx-auto min-h-[100vh] bg-slate-100 relative">
      <PlanHeader />
      <PlanMain />
      {isOpenWriteForm ? (
        <PlanWriteForm onClickCloseWriteForm={onClick} />
      ) : null}
      <PlanFooter onClickOpenForm={onClick} />
    </section>
  );
}
