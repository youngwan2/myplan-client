import IntroSlide from '../components/pages/Intro-page/IntroSlide';
import { introSlides } from '../const/intro';

export default function IntroPage() {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <div className="w-[768px]  relative overflow-hidden bg-white shadow-xl h-[100vh]">
        {/* 슬라이드 */}
        <IntroSlide introSlides={introSlides} />
      </div>
    </div>
  );
}
