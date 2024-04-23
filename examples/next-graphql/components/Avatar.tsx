import { FragmentOf, readFragment } from "gql.tada";
import { ImageFragment } from "@/graphql/fragments/media";

interface AvatarProps {
  name?: string;
  picture: FragmentOf<typeof ImageFragment>;
}

export default function Avatar({ name, picture }: AvatarProps) {
  const imageFrgment = readFragment(ImageFragment, picture);

  return (
    <div className="flex items-center">
      <img
        src={imageFrgment.url}
        className="w-12 h-12 rounded-full mr-4"
        alt={`Avatar of ${name}`}
        width={48}
        height={48}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
