import { FragmentOf, ResultOf, readFragment } from 'gql.tada'
import { ImageProps, UserProps, ActionsProps } from '~/components/ui/types'
import {
  ImageFragment,
  MediaImageFragment,
  UserFragment,
  LinkFragment,
} from '~/graphql/fragments'

export const resolveMediaImage = (
  media: FragmentOf<typeof MediaImageFragment>
): ImageProps => {
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

export const resolveLink = (
  action: FragmentOf<typeof LinkFragment>
): ActionsProps => {
  const { title: text, url: href, internal } = readFragment(LinkFragment, action)

  return {
    text,
    href,
    internal,
  }
}

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
