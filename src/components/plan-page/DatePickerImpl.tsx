import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DatePickerImpl() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DatePicker
        className="text-xl"
        value={value}
        onChange={onChange}
        format="y년MM월dd일"
        clearIcon={null}
      />
    </div>
  );
}
