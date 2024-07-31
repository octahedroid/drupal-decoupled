import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphHeroFragment } from "@/graphql/drupal/fragments/paragraph";
import Hero from "@/components/ui/Hero"
import { extractImageFromMedia } from "@/graphql/drupal/helpers";

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
}

export default function ParagraphHero({ paragraph }: ParagraphHeroProps) {
  const { text, title, image: mediaImage } = readFragment(ParagraphHeroFragment, paragraph)
  if (!mediaImage) {
    return;
  }
  const image = extractImageFromMedia(mediaImage);

  return (
    <Hero title={title} text={text} image={image} />
  );
}
