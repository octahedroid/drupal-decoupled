import { FragmentOf, ResultOf, readFragment } from 'gql.tada'
import { Link } from 'lucide-react'
import { ImageProps, UserProps } from '~/components/ui/types'
import {
  ImageFragment,
  MediaImageFragment,
} from '~/graphql/drupal/fragments/media'
import { UserFragment } from '~/graphql/drupal/fragments/user'
import { LinkFragment } from './fragments/misc'

// Types generated from the GraphQL schema
// type Image = ResultOf<typeof ImageFragment>
// type MediaImage = Omit<ResultOf<typeof MediaImageFragment>, 'mediaImage'> & {mediaImage: Image}
type Link = ResultOf<typeof LinkFragment>

export const parseMediaImage = (media: FragmentOf<typeof MediaImageFragment>): ImageProps => {
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
// @todo: Add Action type to ui/types
export const parseLink = (action: Link) => ({
  text: action.title,
  href: action.url,
  internal: action.internal,
})

// @todo: Review this function
export const parseUser = (
  user: FragmentOf<typeof UserFragment>
): UserProps => {
  if (!user) {
    return {} as UserProps
  }

  const { name, picture } = readFragment(UserFragment, user)

  if (!picture) {
    return { name, avatar: {} as ImageProps }
  }

  return { name, avatar: parseMediaImage(picture) }
}
