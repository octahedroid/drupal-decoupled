import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphCardGroupFragment, ParagraphCardFragment } from "~/graphql/drupal/fragments/paragraph";
import { extractImageFromMedia } from "~/graphql/drupal/helpers";

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
}

export const ParagraphCardGroupResolver = ({ paragraph }: ParagraphHeroProps) => {
  const { id, title, items } = readFragment(ParagraphCardGroupFragment, paragraph)
  const cards = items.map((item) => {
    const { title, text, image } = readFragment(ParagraphCardFragment, item as FragmentOf<typeof ParagraphCardFragment>)
    if (!image) { 
      return { title, text }
    }

    return { title, text, image: extractImageFromMedia(image) } 
  })
  
  return {
    id,
    title,
    cards,
  }
}
