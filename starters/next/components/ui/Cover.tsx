import Avatar from "./Avatar";
import CoverImage from "./CoverImage";
import Heading from "./Heading";
import { ImageType, UserType } from './types';

interface CoverProps {
  title: string;
  image: ImageType;
  author: UserType;
}

export default function Cover({ title, image, author }:CoverProps) {
  return (
    <div className="prose prose-lg max-w-6xl mx-auto">
      <Heading level='h1'>{title}</Heading>
      <div className="md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} path={''} image={image} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
        <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </div>
  );
}
