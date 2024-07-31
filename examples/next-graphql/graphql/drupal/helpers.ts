import { FragmentOf, readFragment } from "gql.tada";
import { ImageFragment, MediaImageFragment } from "@/graphql/drupal/fragments/media";
import { ImageType, UserType } from "@/components/ui/types";
import { UserFragment } from "@/graphql/drupal/fragments/user";
import { ImageElement } from "@/graphql/drupal/types";

export const extractImageFromMedia = (image: ImageElement) => {
  if (!image) {
    return {} as ImageType;
  }

  const { mediaImage }  = readFragment(MediaImageFragment, image);
  const imageElement = readFragment(ImageFragment, mediaImage);

  return imageElement as ImageType;
}

export const extractUser = (user: FragmentOf<typeof UserFragment>): UserType => {
  if (!user) {
    return {} as UserType;
  }

  const { name, picture } = readFragment(UserFragment, user);

  return { name, picture: extractImageFromMedia(picture) };
}
