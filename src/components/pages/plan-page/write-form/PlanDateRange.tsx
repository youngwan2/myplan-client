import { ChangeEventHandler } from 'react';
import { formatTime } from '../../../../utils/formatUtil';

interface PropsType {
  onChange: ChangeEventHandler;
}

export default function PlanDateRange({ onChange }: PropsType) {
  const currentTime = new Date();
  const nextOneHoursOfCurrentTime = new Date(
    currentTime.getTime() + 60 * 60 * 1000,
  ); // 현재 시간 + 1시간

  return (
    <div className="border border-[#acaaaa] rounded-md flex justify-center items-center">
      <input
        type="time"
        name="startTime"
        defaultValue={formatTime(currentTime)}
        onChange={onChange}
      />
      <span> ~ </span>
      <input
        type="time"
        name="endTime"
        defaultValue={formatTime(nextOneHoursOfCurrentTime)}
        onChange={onChange}
      />
    </div>
  );
}
