import type { MediaImage} from '~/@types/gen/schema';

interface AvatarProps {
  name: string;
  picture: MediaImage | undefined;
}

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <img
        src={picture?.mediaImage?.url}
        className="w-12 h-12 rounded-full mr-4"
        alt={`Avatar of ${name}`}
        width={48}
        height={48}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
