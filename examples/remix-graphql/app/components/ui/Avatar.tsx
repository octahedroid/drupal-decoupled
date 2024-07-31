import { ImageType } from './types';
import Image from './Image';

interface AvatarProps {
  name: string;
  picture: ImageType;
}

export default function Avatar({ name, picture }: AvatarProps) {
  
  return (
    <div className="flex items-center">
      <Image {...picture} className="w-12 h-12 rounded-full mr-4" alt={picture.alt} />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
