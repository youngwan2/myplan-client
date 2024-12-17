import { ChangeEventHandler } from 'react';

interface PropsType {
  onChange: ChangeEventHandler;
}

export default function PlanTextArea({ onChange }: PropsType) {
  return (
    <div className="mt-3 flex flex-col">
      <label htmlFor="plan-textarea">일정 메모</label>
      <textarea
        id="plan-textarea"
        onChange={onChange}
        name="description"
        rows={10}
        cols={30}
        placeholder="일정 메모 입력"
        className="mt-1 rounded-md border border-[#acaaaa] p-2"
      />
    </div>
  );
}
