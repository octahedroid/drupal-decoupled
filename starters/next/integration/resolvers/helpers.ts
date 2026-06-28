import type { FragmentOf, ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import type { AvatarProps, ButtonProps, ImageProps } from "@/components/primitives";
import { ImageFragment, MediaImageFragment } from "@/graphql/fragments/media";
import { LinkFragment } from "@/graphql/fragments/misc";
import { UserFragment } from "@/graphql/fragments/user";

export type UserProps = {
  name: ResultOf<typeof UserFragment>["name"];
  avatar: AvatarProps;
};

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export const resolveMediaImage = (
  media: FragmentOf<typeof MediaImageFragment> | null | undefined,
): ImageProps | null => {
  if (!media) return null;

  const { mediaImage } = readFragment(MediaImageFragment, media);
  if (!mediaImage) return null;

  const image = readFragment(ImageFragment, mediaImage);
  if (!image) return null;

  return {
    alt: image.alt || "",
    src: image.url,
    width: image.width,
    height: image.height,
  };
};

export const resolveLink = (
  link: FragmentOf<typeof LinkFragment>,
): ButtonProps | null => {
  const { title: text, url: href, internal } = readFragment(LinkFragment, link);

  if (!text || !href) return null;

  return { text, href, internal };
};

export const resolveUser = (
  user: FragmentOf<typeof UserFragment> | null | undefined,
): UserProps => {
  if (!user) return { name: "", avatar: { name: "" } };

  const { name, picture } = readFragment(UserFragment, user);

  return {
    name,
    avatar: { src: resolveMediaImage(picture)?.src, name },
  };
};
