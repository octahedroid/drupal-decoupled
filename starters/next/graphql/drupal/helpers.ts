import { FragmentOf, readFragment } from 'gql.tada'
import { ImageProps, UserProps } from '@/components/ui/types'
import {
  ImageFragment,
  MediaImageFragment,
} from '@/graphql/drupal/fragments/media'
import { UserFragment } from '@/graphql/drupal/fragments/user'
import { ImageElement } from '@/graphql/drupal/types'

export const extractImageFromMedia = (image: ImageElement) => {
  if (!image) {
    return {} as ImageProps
  }

  const { mediaImage } = readFragment(MediaImageFragment, image)
  const imageElement = readFragment(ImageFragment, mediaImage)

  return imageElement as ImageProps
}

export const extractUser = (
  user: FragmentOf<typeof UserFragment>
): UserProps => {
  if (!user) {
    return {} as UserProps
  }

  const { name, picture } = readFragment(UserFragment, user)

  return { name, avatar: extractImageFromMedia(picture) }
}
