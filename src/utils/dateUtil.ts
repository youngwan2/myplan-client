import { getDaysInMonth } from 'date-fns';
import { formatDate } from './formatUtil';

/**주어진 날짜의 일수를 구함*/
export const getDaysInMon = (year: number, month: number) => {
  return getDaysInMonth(new Date(year, Math.max(month - 1, 0)));
};

/** 주어진 날짜를 YYYY-MM-dd 형식으로 달의 일수만큼 배열로 구함 */
export const toArrayLocalDate = (date = formatDate(new Date())) => {
  const [year, month] = date.split('-').map(Number);
  const days = getDaysInMon(year, month);
  return Array.from({ length: days }).map(
    (_, i) => `${year}-${month}-${i + 1}`,
  );
};

type DayNamePropsType = { dayNumber: number; language?: 'ko' | 'en' };
/**
 * 주어진 일 인덱스를 문자로 변환
 * @example
 * console.log(getDayName({ dayNumber: 0 })); // "일" (기본값 한글)
 * console.log(getDayName({ dayNumber: 3, language: "en" })); // "Wed" (영어)
 * console.log(getDayName({ dayNumber: 6, language: "ko" })); // "토" (한글)
 */
export const getDayName = ({
  dayNumber,
  language = 'ko',
}: DayNamePropsType) => {
  const dayNames = {
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  if (dayNumber < 0 || dayNumber > 6) {
    throw new Error(
      '유효하지 않은 요일 번호입니다. 0부터 6 사이의 숫자를 입력해주세요.',
    );
  }

  const names = dayNames[language];
  if (!names) {
    throw new Error("유효하지 않은 언어 코드입니다. 지원되는 코드: 'ko', 'en'");
  }

  return names[dayNumber];
};

/** 일자를 일수 인덱스로 변환 */
export const formatDateToDayNumber = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).getDay();
};
