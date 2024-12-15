import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export default function useResize() {
  // 초기 상태 설정 (브라우저 환경에서만 유효)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { height, width } = windowSize;

  const handleResize = () => {
    setWindowSize({
      width: Math.min(520, window.innerWidth),
      height: Math.min(520, window.innerWidth),
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('load', handleResize);
    };
  }, []);

  return { height, width };
}
