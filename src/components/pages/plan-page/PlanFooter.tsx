import { BiPlus } from 'react-icons/bi';
import EmptyMessage from '../../common/EmptyMessage';
import Title from '../../common/Title';
import { Task } from '../../../types/plan.type';

interface PropsType {
  onClickOpenForm: () => void;
  tasks: Task[];
}
export default function PlanFooter({ onClickOpenForm, tasks = [] }: PropsType) {
  const planCount = tasks.length;

  return (
    <div className="min-h-[150px] max-h-[350px] h-full w-full bg-slate-500 p-4">
      <div className="flex justify-between">
        <Title className="text-xl font-bold" tagName="h2">
          일정 <span>{planCount}</span>
        </Title>
        <button
          onClick={onClickOpenForm}
          aria-label="플랜 추가 버튼"
          title="플랜 추가"
        >
          <BiPlus />
        </button>
      </div>
      {tasks.length < 1 ? (
        <EmptyMessage
          text="추가된 일정이 없습니다."
          className="text-center p-5"
        />
      ) : (
        <ul>
          <li className="flex">
            <span>제목</span>메모<span>시간</span>
          </li>
          {tasks.map((task) => {
            return (
              <>
                <li>
                  <span>{task.title}</span>
                  <span>{task.description}</span>
                  <span>
                    {' '}
                    {task.startTime} ~ {task.endTime}
                  </span>
                </li>
                <li></li>
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
}
