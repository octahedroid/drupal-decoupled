import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphImageFragment } from '@/graphql/fragments/paragraph';
import { MediaImageFragment, ImageFragment } from "@/graphql/fragments/media";

interface ParagraphImageProps {
  paragraph: FragmentOf<typeof ParagraphImageFragment>
}

export default function ParagraphImage({ paragraph }: ParagraphImageProps) {
  const { image } = readFragment(ParagraphImageFragment, paragraph);
  if (!image) {
    return null;
  }
  const { mediaImage } = readFragment(MediaImageFragment, image);
  const imageFragment = readFragment(ImageFragment, mediaImage);

  return (
      <div className="flex items-center justify-center">
        <img
          src={imageFragment.url}
          alt={`Cover`}
        />
      </div>
  );
}
