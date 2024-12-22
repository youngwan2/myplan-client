interface DateSlidePropsType {
  localDateList: string[];
}
import EmblaCarousel from '../../lib/embla/EmblaCarousel';

export default function DateSlide({ localDateList }: DateSlidePropsType) {
  return (
    <div className="mt-5">
      <EmblaCarousel
        slides={localDateList}
        options={{ startIndex: new Date().getDate() }}
      />
    </div>
  );
}
