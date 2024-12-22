import { useState } from 'react';
import { useParams } from 'react-router';
import usePlanMutation from '../hooks/mutations/usePlanMutaition';
import { usePlanByPlanDateQuery } from '../hooks/queries/usePlanQuery';
import { usePlanTaskState } from '../hooks/usePlanTaskState';

import PlanHeader from '../components/pages/plan-page/PlanHeader';
import PlanMain from '../components/pages/plan-page/PlanMain';
import PlanFooter from '../components/pages/plan-page/PlanFooter';
import PlanWriteFormModal from '../components/pages/plan-page/PlanWriteFormModal';
import CircleChart from '../components/pages/plan-page/CircleChart';

import { formatDate, formatTaskDateToDegree } from '../utils/formatUtil';
import { validatePlan } from '../services/planService';
import { toArrayLocalDate } from '../utils/dateUtil';
import usePathState from '../hooks/usePathState';

export default function PlanPage() {
  const [isOpenWriteFormModal, setIsOpenWriteFormModal] = useState(false);
  const { dueDate: selectPlanDate = formatDate(new Date()) } = useParams<{
    dueDate: string;
  }>();
  const { currentDate, handleChangeDate } = usePathState();
  const localDateList = toArrayLocalDate(selectPlanDate); // 월별 날짜 리스트

  const { mutate, isPending } = usePlanMutation();

  const { data: plan } = usePlanByPlanDateQuery(selectPlanDate);

  // 조건에 관계없이 usePlanTaskState 훅을 항상 호출
  const { tasks, isError, isLoading, handleAddTask } = usePlanTaskState(
    plan?.id?.toString(), // 조건을 인자로만 주고 훅은 항상 호출
  );

  // 차트에 표시하기 위한 task 데이터 포맷팅
  const formattedTasks = plan && tasks ? formatTaskDateToDegree(tasks) : [];

  // 작업 생성  모달 토글
  const handleToggleWriteForm = () => {
    if (!isOpenWriteFormModal) {
      handleCreatePlan();
    }
    setIsOpenWriteFormModal((prev) => !prev);
  };

  // 플랜 생성
  const handleCreatePlan = () => {
    if (!plan) return;
    if (validatePlan(plan, selectPlanDate)) {
      return;
    }
    mutate({ planDate: selectPlanDate });
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <section className="w-[768px] relative bg-white shadow-xl h-[100vh]">
        <PlanHeader
          currentDate={currentDate}
          selectedPlanDate={selectPlanDate}
          localDateList={localDateList}
        />
        <PlanMain>
          {formattedTasks ? <CircleChart tasks={formattedTasks} /> : null}
        </PlanMain>
        {isOpenWriteFormModal && (
          <PlanWriteFormModal
            onClose={handleToggleWriteForm}
            onSubmit={handleAddTask}
            isLoading={isLoading}
          />
        )}
        <PlanFooter onOpenForm={handleToggleWriteForm} tasks={tasks} />
      </section>
    </div>
  );
}
