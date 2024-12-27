import { FragmentOf, ResultOf, readFragment } from 'gql.tada'
import { ImageProps, UserProps } from '~/components/ui/types'
import {
  ImageFragment,
  MediaImageFragment,
} from '~/graphql/fragments/media'
import { UserFragment } from '~/graphql/fragments/user'
import { Link } from '~/graphql/types'

export const resolveMediaImage = (media: FragmentOf<typeof MediaImageFragment>): ImageProps => {
  if (!media) {
    return {} as ImageProps
  }

  const { mediaImage } = readFragment(MediaImageFragment, media)
  if (!mediaImage) {
    return {} as ImageProps
  }

  const image = readFragment(ImageFragment, mediaImage);
  if (!image) {
    return {} as ImageProps
  }

  return {
    alt: image.alt || '',
    src: image.url,
    width: image.width,
    height: image.height,
  }
}

export const resolveLink = (action: Link) => ({
  text: action.title,
  href: action.url,
  internal: action.internal,
})

// @todo: Review this function
export const resolveUser = (
  user: FragmentOf<typeof UserFragment>
): UserProps => {
  if (!user) {
    return {} as UserProps
  }

  const { name, picture } = readFragment(UserFragment, user)

  if (!picture) {
    return { name, avatar: {} as ImageProps }
  }

  return { name, avatar: resolveMediaImage(picture) }
}
