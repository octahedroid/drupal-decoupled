import { ImageType } from "./types";
import Image from "./Image";

interface HeroProps {
  title: string;
  text: string;
  image: ImageType
}

export default function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="bg-[#E0F2FE]">
      <div className="container flex flex-col lg:flex-row items-center gap-6 xl:gap-10">
        <div className="lg:basis-[32%]">
          <h2 className="text-5xl xl:text-[4rem] md:leading-[3rem] lg:leading-[3.7rem] xl:leading-[5rem] text-secondary tracking-[-4px] font-bold mt-10 lg:mt-0">
            {title}
          </h2>
          <p className="font-normal text-secondary text-base md:text-[1.25rem] lg:text-[1.25rem] leading-6 md:leading-8 lg:leading-[2.15rem] mt-6">
            {text}
          </p>
        </div>

        <div className="w-full lg:basis-[68%]">
          <Image {...image} className={"w-full h-auto aspect-auto"} alt={image.alt} />
        </div>
      </div>
    </section>
  );
}
