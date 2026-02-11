import { type FragmentOf, readFragment } from "gql.tada";
import type { ButtonProps, ImageProps } from "@/components/primitives";
import { ImageFragment, MediaImageFragment } from "@/graphql/fragments/media";
import { LinkFragment } from "@/graphql/fragments/misc";
import { UserFragment } from "@/graphql/fragments/user";

// @todo: Import types from privitives
type UserProps = {
  name: string;
  avatar: {
    src?: string;
    name: string;
  };
};

export const resolveMediaImage = (
  media: FragmentOf<typeof MediaImageFragment>,
): ImageProps => {
  if (!media) {
    return {} as ImageProps;
  }

  const { mediaImage } = readFragment(MediaImageFragment, media);
  if (!mediaImage) {
    return {} as ImageProps;
  }

  const image = readFragment(ImageFragment, mediaImage);
  if (!image) {
    return {} as ImageProps;
  }

  return {
    alt: image.alt || "",
    src: image.url,
    width: image.width,
    height: image.height,
  };
};

export const resolveLink = (
  link: FragmentOf<typeof LinkFragment>,
): ButtonProps => {
  const { title: text, url: href, internal } = readFragment(LinkFragment, link);

  if (!text || !href) {
    return {} as ButtonProps;
  }

  return {
    text,
    href,
    internal,
  };
};

export const resolveUser = (
  user: FragmentOf<typeof UserFragment>,
): UserProps => {
  if (!user) {
    return {} as UserProps;
  }

  const { name, picture } = readFragment(UserFragment, user);

  if (!picture) {
    return { name, avatar: {} } as UserProps;
  }

  return { name, avatar: resolveMediaImage(picture) } as UserProps;
};
