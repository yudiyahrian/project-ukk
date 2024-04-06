import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./PhotoCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./PhotoCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Photo } from "@prisma/client";
import Image from "next/image";
import "@styles/embla.css";

type PropType = {
  photos: Photo[];
  options?: EmblaOptionsType;
};

const PhotoCarousel: React.FC<PropType> = (props) => {
  const { photos, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {photos.map((photo) => (
            <div className="embla__slide" key={photo.id}>
              <div className="max-h-[100vw] h-full w-full object-contain overflow-hidden relative bg-black">
                <Image
                  src={photo.photo}
                  alt={photo.caption ?? ""}
                  width={0}
                  height={0}
                  sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-30 object-cover scale-[1.2] blur-xl"
                />
                <Image
                  src={photo.photo}
                  alt={photo.caption ?? ""}
                  width={0}
                  height={0}
                  sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-[400px] object-contain relative"
                />
              </div>
            </div>
          ))}
        </div>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
