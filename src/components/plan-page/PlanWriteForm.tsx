import { BiSolidCoffeeTogo } from 'react-icons/bi';
import { BiSolidChevronLeft } from 'react-icons/bi';
import { BiCheck } from 'react-icons/bi';
import { BiRefresh } from 'react-icons/bi';
import CircleChartEdit from './CircleChartEdit';
import ColorPicker from './ColorPicker';
import PlanDateRange from './PlanDateRange';

interface PropsType {
  onClickCloseWriteForm: () => void;
}

export default function PlanWriteForm({ onClickCloseWriteForm }: PropsType) {
  return (
    <section className="max-w-[768px] w-full fixed top-0 left-[50%] translate-x-[-50%] h-full bg-[#f5f5f5] p-3">
      {/* 상단 헤더 */}
      <div className="flex justify-between text-2xl py-5">
        <button onClick={onClickCloseWriteForm}>
          <BiSolidChevronLeft />{' '}
        </button>
        <div className="flex items-center">
          <button className="px-3">
            <BiRefresh />{' '}
          </button>
          <button className="px-1">
            <BiCheck />
          </button>
        </div>
      </div>

      {/* 원형 시간표 편집기 */}
      <CircleChartEdit />

      {/* 플랜 작성 폼 */}
      <div>
        <div className="flex justify-between py-2 mt-3">
          <h2 className="font-bold text-xl">일정 선택</h2>
          <button className=" text-xl" onClick={onClickCloseWriteForm}>
            <BiSolidCoffeeTogo />
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex">
            <ColorPicker />
            <PlanDateRange />
          </div>
        </form>
      </div>
    </section>
  );
}
