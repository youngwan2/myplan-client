import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import usePlanMutation from '../hooks/mutations/usePlanMutaition';
import { usePlanByPlanDateQuery } from '../hooks/queries/usePlanQuery';
import { usePlanTaskState } from '../hooks/usePlanTaskState';

import PlanHeader from '../components/pages/plan-page/PlanHeader';
import PlanMain from '../components/pages/plan-page/PlanMain';
import PlanFooter from '../components/pages/plan-page/PlanFooter';
import PlanWriteFormModal from '../components/pages/plan-page/PlanWriteFormModal';
import CircleChart from '../components/pages/plan-page/CircleChart';

import { formatTaskDateToDegree } from '../utils/formatUtil';
import { validatePlan } from '../services/planService';

export default function PlanPage() {
  const [isOpenWriteFormModal, setIsOpenWriteFormModal] = useState(false);
  const { dueDate: selectPlanDate } = useParams<{ dueDate: string }>();
  const navigate = useNavigate();
  const { mutate, isPending } = usePlanMutation();

  const { data: plan, isLoading: planDataIsLoading } =
    usePlanByPlanDateQuery(selectPlanDate);

  // 조건에 관계없이 usePlanTaskState 훅을 항상 호출
  const {
    planDate,
    tasks,
    isError,
    isLoading,
    handleAddTask,
    handleDateChange,
  } = usePlanTaskState(
    new Date(),
    plan?.id?.toString(), // 조건을 인자로만 주고 훅은 항상 호출
  );

  // 차트에 표시하기 위한 task 데이터 포맷팅
  const formattedTasks = plan && tasks ? formatTaskDateToDegree(tasks) : [];

  // 날짜 변경 시 페이지 이동
  const handlePathChange = () => {
    navigate(`/plan/${planDate}`);
  };

  // 플랜 작업 추가 폼 토글
  const handleToggleWriteForm = () => {
    if (!isOpenWriteFormModal) {
      handleCreatePlan();
    }
    setIsOpenWriteFormModal((prev) => !prev);
  };

  // 플랜 생성
  const handleCreatePlan = () => {
    if (!plan) return;
    if (validatePlan(plan, planDate)) {
      return;
    }
    mutate({ planDate });
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <section className="w-[768px] relative bg-white shadow-xl h-[100vh]">
        <PlanHeader
          onDateChange={(date) => {
            handleDateChange(date);
            handlePathChange();
          }}
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
