import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphImageFragment } from '~/graphql/drupal/fragments/paragraph';
import { extractImageFromMedia } from '~/graphql/drupal/helpers';

interface ParagraphImageProps {
  paragraph: FragmentOf<typeof ParagraphImageFragment>
}

export const ParagraphImageResolver = ({ paragraph }: ParagraphImageProps) => {
  const { id, image: mediaImage } = readFragment(ParagraphImageFragment, paragraph);
  if (!mediaImage) {
    return null;
  }
  const image = extractImageFromMedia(mediaImage);

  return {
    id,
    ...image,
    variant: 'primary'
  }
}
