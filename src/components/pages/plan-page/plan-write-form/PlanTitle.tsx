import { ChangeEventHandler } from 'react';

interface PropsType {
  onChange: ChangeEventHandler;
}

export default function PlanTitle({ onChange }: PropsType) {
  return (
    <div className="mt-3">
      <label htmlFor="plan-title">일정 제목</label>
      <input
        id="plan-title"
        name="title"
        type="text"
        className=" w-full h-12 px-2 bg-white border border-[#acaaaa] mt-1"
        onChange={onChange}
      />
    </div>
  );
}
