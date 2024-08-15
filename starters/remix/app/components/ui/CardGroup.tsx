import Image, { ImageType, ImageDefaultProps } from './Image';

export type Cards = Array<Card>;

type Card = { 
  title: string;
  text: string
  image: ImageType;
}

export type CardGroupProps = {
  title: string;
  cards: Cards
}

const CardPropsDefault: Card = {
  title: "Cart Title",
  text: "Cart Text",
  image: ImageDefaultProps
}

export const CardGroupPropsDefault: CardGroupProps = {
  title: "Card Group Title",
  cards: [
    CardPropsDefault,
    CardPropsDefault,
    CardPropsDefault,
  ]
}

export default function CardGroup({ title, cards }: CardGroupProps) {
  return (
    <div className="container py-10 lg:py-[70px]">
      <h2 className="text-[2rem] xl:text-[3.5rem] leading-[40px] xl:leading-[60px] mb-16 xl:mb-[105px] font-bold text-center text-primary">
        {title}
      </h2>
      <div className="flex xl:flex-nowrap justify-center xl:justify-start gap-x-0 gap-y-8 md:gap-y-16">
        {cards && cards.map((cardItem, index) => {
          const card = { ...CardPropsDefault, ...cardItem };
          return (
          <div
            className="flex-layout flex-[0_1_100%] xl:flex-[0_1_33.33%] flex flex-col gap-6 items-center justify-center"
            key={index}
          >
            <Image {...card.image} width={200} height={200} alt={card.image.alt} />
            <h4 className="text-primary text-xl lg:text-[1.625rem] leading-[1.87rem] lg:leading-9 font-ztgatha font-bold -mt-[10px] lg:mt-[0]">
              {card.title}
            </h4>
            <p className="paragraph text-center w-full md:w-[97%] lg:w-[96%] xl:w-full m-auto">
              {card.text}
            </p>
          </div>
        )})}
      </div>
    </div>
  );
}