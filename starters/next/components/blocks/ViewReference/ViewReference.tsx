import { CardGroup, Hero } from "@/components/blocks";
import type { CardGroupProps } from "@/components/blocks/CardGroup/CardGroup";
import type { ImageProps } from "@/components/primitives";

type ViewReferenceAction = {
  href: string;
  text: string;
  internal?: boolean;
};

type ViewReferenceCard = {
  heading: string;
  summary?: string | null;
  type: string;
  details: { href: string; text: string; internal: boolean };
  image?: ImageProps;
};

export interface ViewReferenceProps {
  id: string;
  view?: string;
  display?: string;
  cards: ViewReferenceCard[];
  headingOptional?: string | null;
  subheadingOptional?: string | null;
  descriptionOptional?: string | null;
  action?: ViewReferenceAction;
}

export const ViewReference = ({
  id,
  view,
  display,
  cards,
  headingOptional,
  subheadingOptional,
  descriptionOptional,
  action,
}: ViewReferenceProps) => {
  if (view === "blog" && display === "teaser_featured") {
    const featured = cards[0];
    const remainingCards = cards.slice(1);

    return (
      <div id={id}>
        <Hero
          heading={featured.heading}
          image={featured.image}
          description={featured.summary ?? ""}
          actions={[
            {
              href: featured.details.href,
              text: featured.details.text,
              internal: true,
            },
          ]}
        />
        {remainingCards.length > 0 && (
          <CardGroup
            key={id}
            heading={headingOptional || ""}
            subheading={subheadingOptional || ""}
            description={descriptionOptional || ""}
            cards={remainingCards as CardGroupProps["cards"]}
            action={action as CardGroupProps["action"]}
          />
        )}
      </div>
    );
  }

  if (view === "blog" && display === "teaser") {
    return (
      <CardGroup
        id={id}
        key={id}
        heading={headingOptional || ""}
        subheading={subheadingOptional || ""}
        description={descriptionOptional || ""}
        cards={cards as CardGroupProps["cards"]}
        action={action as CardGroupProps["action"]}
      />
    );
  }

  return null;
};
