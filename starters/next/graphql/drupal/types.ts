import { FragmentOf } from 'gql.tada'
import { MediaImageFragment } from '@/graphql/drupal/fragments/media'
import {
  NodeArticleFragment,
  NodePageFragment,
} from '@/graphql/drupal/fragments/node'
import { TermTagsFragment } from '@/graphql/drupal/fragments/terms'

export type EntityFragmentType =
  | FragmentOf<typeof NodePageFragment>
  | FragmentOf<typeof NodeArticleFragment>
  | FragmentOf<typeof TermTagsFragment>

export type ImageElement = FragmentOf<typeof MediaImageFragment> | null
