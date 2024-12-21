import { IoAdd } from 'react-icons/io5';
import { PlanFooterPropsType } from '../../../types/plan.types';

export default function PlanFooter({ onOpenForm, tasks }: PlanFooterPropsType) {
  return (
    <footer className="absolute bottom-0 w-full p-4 bg-white border-t">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          총 {tasks?.length || 0}개의 일정이 있습니다.
        </div>
        <button
          onClick={onOpenForm}
          className="bg-black text-white p-2 rounded-lg text-sm flex items-center"
        >
          <IoAdd className="mr-1" />
          일정 추가
        </button>
      </div>
    </footer>
  );
}
