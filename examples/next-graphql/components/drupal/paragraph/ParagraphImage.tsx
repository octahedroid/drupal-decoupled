import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphImageFragment } from '@/graphql/fragments/paragraph';
import { extractImageFromMedia } from '@/graphql/helpers';
import Image from "@/components/ui/Image";

interface ParagraphImageProps {
  paragraph: FragmentOf<typeof ParagraphImageFragment>
}

export default function ParagraphImage({ paragraph }: ParagraphImageProps) {
  const { image: mediaImage } = readFragment(ParagraphImageFragment, paragraph);
  if (!mediaImage) {
    return null;
  }
  const image = extractImageFromMedia(mediaImage);

  return (
    <Image {...image} variant='primary' />
  );
}
