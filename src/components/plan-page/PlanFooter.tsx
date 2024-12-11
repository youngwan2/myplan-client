import { BiPlus } from 'react-icons/bi';
import EmptyMessage from '../EmptyMessage';

interface PropsType {
  onClickOpenForm: () => void;
}
export default function PlanFooter({ onClickOpenForm }: PropsType) {
  return (
    <div className="min-h-[150px] max-h-[350px] h-full w-full bg-slate-500 p-3">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">
          일정 <span>0</span>
        </h2>
        <button
          onClick={onClickOpenForm}
          aria-label="플랜 추가 버튼"
          title="플랜 추가"
        >
          <BiPlus />
        </button>
      </div>
      <EmptyMessage
        text="추가된 일정이 없습니다."
        className="text-center p-5"
      />
    </div>
  );
}
