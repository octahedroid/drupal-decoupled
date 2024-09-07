import { FragmentOf, readFragment } from "gql.tada";
import { ImageProps } from "@/components/ui/types";
import { ImageFragment, MediaImageFragment } from "@/graphql/drupal/fragments/media";
import { UserFragment } from "@/graphql/drupal/fragments/user";
import { ImageElement } from "@/graphql/drupal/types";

export const extractImageFromMedia = (image: ImageElement) => {
  if (!image) {
    return {} as ImageProps;
  }

  const { mediaImage }  = readFragment(MediaImageFragment, image);
  const imageElement = readFragment(ImageFragment, mediaImage);

  return imageElement as ImageProps;
}

export const extractUser = (user: FragmentOf<typeof UserFragment>): UserType => {
  if (!user) {
    return {} as ImageProps;
  }

  const { name, picture } = readFragment(UserFragment, user);

  return { name, avatar: extractImageFromMedia(picture) };
}
