// 시간을 각도로 변환하는 함수
export const calculateDegree = (
  hour = 0,
  minute = 0,
  type: '12' | '24',
): number => {
  if (type === '24') {
    return (hour * 60 + minute) * 0.25;
  } else {
    const customHour = hour % 12;
    return (customHour * 60 + minute) * 0.5;
  }
};

// 각도를 라디안으로 변환
export const angleToRadians = (angle: string | number = 0) =>
  (Number(angle) * Math.PI) / 180;
