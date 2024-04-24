import { FragmentOf, readFragment } from "gql.tada";
import { ImageFragment, MediaImageFragment } from "@/graphql/fragments/media";

interface CoverImageProps {
  title: string;
  path: string;
  image: FragmentOf<typeof MediaImageFragment>;
  width: number;
  height: number;
  styleName: string;
}

export default function CoverImage({
  title,
  path,
  image,
  width,
  height,
}: CoverImageProps) {
  const mediaImageFragment = readFragment(MediaImageFragment, image);
  if (!mediaImageFragment) {
    return null;
  }

  const imageFragment = readFragment(
    ImageFragment,
    mediaImageFragment.mediaImage
  );

  const Image = (
    <img
      src={imageFragment.url}
      alt={`Teaser for ${title}`}
      width={width}
      height={height}
      style={{
        backgroundSize: "cover",
        backgroundColor: "#eee",
        width: "100%",
        height: "auto",
      }}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {path ? (
        <a href={path} aria-label={title}>
          {Image}
        </a>
      ) : (
        Image
      )}
    </div>
  );
}
