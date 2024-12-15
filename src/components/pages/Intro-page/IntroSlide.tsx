import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { useState } from 'react';
import AuthLink from './AuthLink';
import SlideIndicator from './SlideIndicator';
import type { IntroSlide } from '../../../types/intro.type';

interface PropsType {
  introSlides: IntroSlide[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

/** reference: https://motion.dev/docs/react-animate-presence */
export default function IntroSlide({ introSlides }: PropsType) {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = wrap(0, introSlides.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className="w-full h-full "
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 100, damping: 300000 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <div className="flex items-center justify-center flex-col h-full">
            <div className="text-7xl mb-6">{introSlides[slideIndex].icon}</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {introSlides[slideIndex].title}
            </h2>
            <p className="text-xl text-gray-700 mb-2">
              {introSlides[slideIndex].description}
            </p>
            <p className="text-base text-gray-600 mb-6">
              {introSlides[slideIndex].subDescription}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 슬라이드 인디케이터 */}
      <SlideIndicator
        introSlides={introSlides}
        slideIndex={slideIndex}
        onClickSwitching={paginate}
      />

      {/* 로그인/회원가입 링크 */}
      {slideIndex === introSlides.length - 1 && <AuthLink />}
    </>
  );
}
