import { FragmentOf } from 'gql.tada'
import {
  NodeArticleFragment,
  NodePageFragment,
  TermTagsFragment,
} from '~/graphql/fragments'

export type EntityFragmentType =
  | FragmentOf<typeof NodePageFragment>
  | FragmentOf<typeof NodeArticleFragment>
  | FragmentOf<typeof TermTagsFragment>
