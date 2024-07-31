import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphCardGroupFragment, ParagraphCardFragment } from "@/graphql/fragments/paragraph";
import CardGroup, { Cards } from "@/components/ui/CardGroup";
import { extractImageFromMedia } from "@/graphql/helpers";

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
}

export default function ParagraphCardGroup({ paragraph }: ParagraphHeroProps) {
  const { title, items } = readFragment(ParagraphCardGroupFragment, paragraph)
  const cards = items.map((item) => {
    const { title, text, image } = readFragment(ParagraphCardFragment, item as FragmentOf<typeof ParagraphCardFragment>)
    if (!image) { 
      return { title, text }
    }

    return { title, text, image: extractImageFromMedia(image) } 
  })
  
  return (
    <CardGroup title={title} cards={cards as Cards} />
  );
}
