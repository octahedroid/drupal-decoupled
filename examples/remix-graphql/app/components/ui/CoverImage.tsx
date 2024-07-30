import { Link } from '@remix-run/react'
import Image from '~/components/ui/Image';
import { ImageType } from '~/utils/types';

interface CoverImageProps {
  title: string;
  path: string;
  image: ImageType;
}

export default function CoverImage({ title, path, image }: CoverImageProps) {
  
  const ImageComponent = (
      <Image
        url={image.url}
        alt={`Teaser for ${title}`}
        title={title}
        className={`w-full`}
        variant='primary'
        width={image.width ? image.width: 'auto'}
        height={image.height ? image.height: 'auto'}
        style={{
          backgroundSize: 'cover',
          backgroundColor: '#eee',
          width: '100%',
          height: 'auto',
        }}
      />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {path ? (
        <Link prefetch='intent' to={path} aria-label={title}>
          {ImageComponent}
        </Link>
      ) : (
        ImageComponent
      )}
    </div>
  );
}
