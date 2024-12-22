import './embla.css';
import React, { useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay,
} from './EmblaCarouselSelectedSnapDisplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useDateStore } from '../../../store/dateStore';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 슬라이드 번호 추적

  const { currentDate, setDate } = useDateStore();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  function updateDate(index: number) {
    setSelectedIndex(index + 1);
    setDate(slides[index]);
  }

  useEffect(() => {
    const targetIndex = slides.indexOf(currentDate);
    setSelectedIndex(targetIndex + 1);
    emblaApi?.scrollTo(targetIndex, false);
  }, [currentDate]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((d, i) => {
            const day = Number(d.split('-')[2]);
            return (
              <button
                onClick={() => updateDate(i)}
                className={`embla__slide ${day === selectedIndex ? 'bg-slate-200' : null}`}
                key={d}
              >
                <span className={`embla__slide__number`}>{day}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
