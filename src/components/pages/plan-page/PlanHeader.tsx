import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { Value } from '../../../types/lib.type';
import { PlanHeaderPropsType } from '../../../types/plan.types';

export default function PlanHeader({ onDateChange }: PlanHeaderPropsType) {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="p-4">
      <DatePicker
        onChange={onChange}
        value={value}
        format="y-MM-dd"
        className="mr-2"
        closeCalendar
        clearIcon={null}
      />
      <button
        className="border border-l-transparent hover:bg-slate-50 active:bg-[#dadada] border-[#7d7d7e] pt-[1.8px] p-[1.1px]"
        onClick={() => onDateChange(value)}
      >
        변경
      </button>
    </div>
  );
}
