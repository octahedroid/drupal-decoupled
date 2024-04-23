import { FragmentOf, readFragment } from 'gql.tada';
import { MediaImageFragment } from "@/graphql/fragments/media";
import { UserFragment } from "@/graphql/fragments/user";
import Avatar from "@/components/Avatar";
import CoverImage from "@/components/CoverImage";
import Title from "@/components/field/Title";

interface CoverProps {
  title: string;
  image: FragmentOf<typeof MediaImageFragment>;
  author: FragmentOf<typeof UserFragment> | null;
}

export default function Cover({ title, image, author }:CoverProps) {
  const authorFragment = readFragment(UserFragment, author);

  if (!authorFragment) {
    return null;
  }

  const pictureFragment = readFragment(MediaImageFragment, authorFragment.picture);

  if (!pictureFragment) {
    return null;
  }
  
  return (
    <div className="prose prose-lg max-w-6xl mx-auto">
      <Title>{title}</Title>
      <div className="md:block md:mb-12">
        <Avatar name={authorFragment.name} picture={pictureFragment.mediaImage} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} path={''} image={image} width={1280} height={960} styleName='wide'/>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
        <Avatar name={authorFragment.name} picture={pictureFragment.mediaImage} />
        </div>
      </div>
    </div>
  );
}
