import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadcnAvatar,
} from "~/components/ui/avatar";

export interface AvatarProps {
  src?: string;
  name: string;
}

export const Avatar = ({ src, name }: AvatarProps) => {
  if (src) {
    return (
      <ShadcnAvatar className="mb-4 size-16">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </ShadcnAvatar>
    );
  }
  return (
    <ShadcnAvatar className="mb-4 size-16">
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </ShadcnAvatar>
  );
};
