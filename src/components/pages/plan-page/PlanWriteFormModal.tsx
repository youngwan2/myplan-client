import { ChangeEvent, FormEvent, useState } from 'react';
import { BiSolidChevronLeft, BiCheck, BiRefresh } from 'react-icons/bi';

import { PlanWriteFormModalPropsType } from '../../../types/plan.types';
import { formatTime } from '../../../utils/formatUtil';

import PlanTitle from './write-form/PlanTitle';
import CircleChartEdit from './write-form/CircleChartEdit';
import ColorPicker from './write-form/ColorPicker';
import PlanDateRange from './write-form/PlanDateRange';
import PlanTextArea from './write-form/PlanTextArea';
import { Task } from '../../../types/task.type';

const currentTime = new Date();
const nextOneHoursOfCurrentTime = new Date(
  currentTime.getTime() + 60 * 60 * 1000,
);

export default function PlanWriteFormModal({
  onClose,
  onSubmit,
  isLoading,
}: PlanWriteFormModalPropsType) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    colorCode: '#000000',
    startTime: formatTime(currentTime),
    endTime: formatTime(nextOneHoursOfCurrentTime),
  });

  function handleChange(e: ChangeEvent<any>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(formData as Task);
  }

  return (
    <section className="max-w-[768px] w-full fixed top-0 left-[50%] translate-x-[-50%] h-full bg-[#f5f5f5] p-3">
      {/* 상단 헤더 */}
      <div className="flex justify-between text-2xl py-5">
        <button onClick={onClose}>
          <BiSolidChevronLeft />{' '}
        </button>
        <div className="flex items-center">
          <button
            className="px-3"
            aria-label="초기화"
            onClick={() =>
              setFormData({
                title: '',
                description: '',
                colorCode: '#000000',
                startTime: formatTime(currentTime),
                endTime: formatTime(nextOneHoursOfCurrentTime),
              })
            }
            disabled={isLoading}
          >
            <BiRefresh />
          </button>
          <button
            className="px-1"
            aria-label="저장"
            onClick={handleSubmit}
            disabled={isLoading}
          >
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
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex flex-col">
            <div className="flex">
              <ColorPicker onChange={handleChange} />
              <PlanDateRange onChange={handleChange} />
            </div>
            <PlanTitle onChange={handleChange} />
            <PlanTextArea onChange={handleChange} />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="font-bold text-white bg-[#4caf50] hover:bg-[#45a049] rounded-md px-5 py-2 disabled:opacity-50 disabled:hover:bg-[#4caf50]"
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
