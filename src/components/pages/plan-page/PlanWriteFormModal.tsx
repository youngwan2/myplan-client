import { ChangeEvent, FormEvent, useState } from 'react';

import type { Task } from '../../../types/plan.type';
import { BiSolidChevronLeft, BiCheck, BiRefresh } from 'react-icons/bi';
import { formatTime } from '../../../utils/formatUtil';
import CircleChartEdit from './write-form/CircleChartEdit';
import ColorPicker from './write-form/ColorPicker';
import PlanDateRange from './write-form/PlanDateRange';
import PlanTextArea from './write-form/PlanTextArea';
import PlanTitle from './write-form/PlanTitle';

interface PropsType {
  onClickCloseWriteForm: () => void;
  addTask: (newTask: Task) => void;
}

const currentTime = new Date();
const nextOneHoursOfCurrentTime = new Date(
  currentTime.getTime() + 60 * 60 * 1000,
); // 현재 시간 + 1시간

export default function PlanWriteFormModal({
  onClickCloseWriteForm,
  addTask,
}: PropsType) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    colorCode: '#000000',
    startTime: formatTime(currentTime),
    endTime: formatTime(nextOneHoursOfCurrentTime),
  });

  function onChange(e: ChangeEvent<any>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    addTask(formData);
  }

  return (
    <section className="max-w-[768px] w-full fixed top-0 left-[50%] translate-x-[-50%] h-full bg-[#f5f5f5] p-3">
      {/* 상단 헤더 */}
      <div className="flex justify-between text-2xl py-5">
        <button onClick={onClickCloseWriteForm}>
          <BiSolidChevronLeft />{' '}
        </button>
        <div className="flex items-center">
          <button className="px-3" aria-label="초기화">
            <BiRefresh />{' '}
          </button>
          <button className="px-1" aria-label="뒤로가기">
            <BiCheck />
          </button>
        </div>
      </div>

      {/* 원형 시간표 편집기 */}
      <CircleChartEdit />

      {/* task 작성 폼 */}
      <div>
        <div className="flex justify-between py-2 mt-3">
          <h2 className="font-bold text-xl">일정 선택</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-3">
          <div className="flex flex-col">
            <div className="flex">
              <ColorPicker onChange={onChange} />
              <PlanDateRange onChange={onChange} />
            </div>
            <PlanTitle onChange={onChange} />
            <PlanTextArea onChange={onChange} />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="font-bold text-white bg-[#4caf50] hover:bg-[#45a049] rounded-md px-5 py-2"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
