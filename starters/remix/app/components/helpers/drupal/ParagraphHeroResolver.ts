import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphHeroFragment } from "~/graphql/drupal/fragments/paragraph";
import { extractImageFromMedia } from "~/graphql/drupal/helpers";

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
}

export const ParagraphHeroResolver = ({ paragraph }: ParagraphHeroProps) => {
  const { id, text, title, image: mediaImage } = readFragment(ParagraphHeroFragment, paragraph)
  if (!mediaImage) {
    return;
  }
  const image = extractImageFromMedia(mediaImage);

  return {
    id,
    title,
    text,
    image,
  }
}
