import { FragmentOf, readFragment } from 'gql.tada'
import { ImageFragment, MediaImageFragment } from '~/graphql/fragments/media'
import { LinkFragment } from '~/graphql/fragments/misc'
import { UserFragment } from '~/graphql/fragments/user'

// @todo: Import types from privitives
type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

type UserProps = {
  name: string
  avatar: {
    src?: string
    name: string
  }
}

type ActionsProps = {
  href: string | null
  internal?: boolean
  text?: string | null
}

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

  const image = readFragment(ImageFragment, mediaImage)
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
  const {
    title: text,
    url: href,
    internal,
  } = readFragment(LinkFragment, action)

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
