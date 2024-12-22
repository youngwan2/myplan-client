import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { Value } from '../../../types/lib.type';
import { PlanHeaderPropsType } from '../../../types/plan.types';
import DateSlide from './DateSlide';
import PlanTitle from './PlanTitle';
import { useDateStore } from '../../../store/dateStore';
import { formatDate } from '../../../utils/formatUtil';

export default function PlanHeader({
  selectedPlanDate,
  localDateList,
}: PlanHeaderPropsType) {
  const [value, onChange] = useState<Value>(new Date());
  const { setDate, currentDate } = useDateStore();

  function handleDateChange(e: Value) {
    if (!e) return;
    onChange(e);
    setDate(formatDate(new Date(e.toString())));
  }

  useEffect(() => {
    onChange(new Date(currentDate));
  }, [currentDate]);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <DatePicker
            onChange={handleDateChange}
            value={value}
            format="y-MM-dd"
            closeCalendar
            clearIcon={null}
          />
        </div>
        <PlanTitle selectedPlanDate={selectedPlanDate} />
      </div>
      <DateSlide localDateList={localDateList} />
    </div>
  );
}
