import type { MediaImage, User as Author } from '~/@types/gen/schema';
import Avatar from "~/components/Avatar";
// import Date from "~/components/Date";
import CoverImage from "~/components/CoverImage";
import Title from "~/components/field/Title";


interface CoverProps {
  title: string;
  image: MediaImage | undefined;
  // date: string;
  author: Author;
}

export default function Cover({ title, image, date, author }:CoverProps) {
  return (
    <div className="prose prose-lg max-w-6xl mx-auto">
      <Title>{title}</Title>
      <div className="md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-6 text-lg">
        {/* <Date dateString={date} /> */}
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={title} path={''} image={image} width={1280} height={960} styleName='wide'/>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </div>
  );
}
