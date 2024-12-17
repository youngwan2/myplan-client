import { useState } from 'react';

import PlanFooter from '../components/pages/plan-page/PlanFooter';
import PlanHeader from '../components/pages/plan-page/PlanHeader';
import PlanMain from '../components/pages/plan-page/PlanMain';
import PlanWriteFormModal from '../components/pages/plan-page/PlanWriteFormModal';
import CircleChart from '../components/pages/plan-page/CircleChart';

import type { Plan, Task } from '../types/plan.type';
import { formatTaskDateToDegree } from '../utils/formatUtil';
import {
  existingColorCode,
  isOverlappingTaskTime,
} from '../utils/validationUtils';

export default function PlanPage() {
  const [isOpenWriteFormModal, setIsOpenWriteFormModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // 기존 HH:MM 형식의 시간 포맷을 svg 렌더링을 위한 각도로 포맷을 변경
  const formattedTasks: Task[] = formatTaskDateToDegree(tasks);

  function onClick() {
    setIsOpenWriteFormModal(!isOpenWriteFormModal);
  }

  function addPlan(plan: Plan) {}

  function addTask(newTask: Task) {
    if (existingColorCode(tasks, newTask.colorCode))
      return alert('기존에 사용된 색상입니다. 다른 색상을 선택해주세요.');
    if (isOverlappingTaskTime(tasks, newTask))
      return alert(
        '기존 작업과 시간이 겹칩니다. 겹치지 않도록 일정을 조율해주세요.',
      );
    setTasks([...tasks, { ...newTask }]);
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <section className="w-[768px] relative bg-white shadow-xl h-[100vh]">
        <PlanHeader />
        <PlanMain>
          <CircleChart tasks={formattedTasks} />
        </PlanMain>
        {isOpenWriteFormModal ? (
          <PlanWriteFormModal
            onClickCloseWriteForm={onClick}
            addTask={addTask}
          />
        ) : null}
        <PlanFooter onClickOpenForm={onClick} tasks={tasks} />
      </section>
    </div>
  );
}
