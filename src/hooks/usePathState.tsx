import { useNavigate } from 'react-router';
import { Value } from '../types/lib.type';
import { formatDate } from '../utils/formatUtil';
import { useEffect } from 'react';
import { useDateStore } from '../store/dateStore';

export default function usePathState() {
  const navigate = useNavigate();
  const { currentDate } = useDateStore();

  function handleChangeDate(date: Value) {
    if (!date) return;
    navigate(`/plan/${formatDate(new Date(date.toString()))}`);
  }

  useEffect(() => {
    if (!currentDate) return;
    const resultDate = currentDate;
    navigate(`/plan/${resultDate}`);
  }, [currentDate]);

  return { currentDate, handleChangeDate };
}
