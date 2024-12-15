import { IntroSlide } from '../../../types/intro.type';

interface PropsType {
  introSlides: IntroSlide[];
  slideIndex: number;
  onClickSwitching: (index: number) => void;
}

export default function SlideIndicator({
  introSlides,
  slideIndex,
  onClickSwitching,
}: PropsType) {
  return (
    <div className="flex absolute top-20 left-[50%] translate-x-[-50%]">
      {introSlides.map((_, index) => (
        <button
          onClick={() => onClickSwitching(1)}
          key={index}
          className={`mx-2 h-3 w-3 rounded-full transition-colors duration-300 ${
            index === slideIndex ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
