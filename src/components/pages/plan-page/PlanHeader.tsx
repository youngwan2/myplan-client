import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { useNavigate } from 'react-router';
import { formatDate } from '../../../utils/formatUtil';
import { Value } from '../../../types/lib.type';

export default function PlanHeader() {
  const [value, onChange] = useState<Value>(new Date());
  const navigation = useNavigate();

  function changePath(date: Value) {
    navigation(`/plan/${formatDate(new Date(date?.toString() || 0))}`);
  }

  return (
    <div className="p-4">
      <DatePicker
        closeCalendar
        value={value}
        onChange={onChange}
        format="y년MM월dd일"
        clearIcon={null}
      />
      <button
        className="border border-l-transparent hover:bg-slate-50 active:bg-[#dadada] border-[#7d7d7e] pt-[1.8px] p-[1.1px]"
        onClick={() => {
          changePath(value);
        }}
      >
        {' '}
        변경
      </button>
    </div>
  );
}
