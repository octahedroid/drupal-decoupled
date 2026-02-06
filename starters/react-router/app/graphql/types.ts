import type { FragmentOf } from "gql.tada";
import type {
  NodeArticleFragment,
  NodePageFragment,
} from "~/graphql/fragments/node";
import type { TermTagsFragment } from "~/graphql/fragments/terms";

export type EntityFragmentType =
  | FragmentOf<typeof NodePageFragment>
  | FragmentOf<typeof NodeArticleFragment>
  | FragmentOf<typeof TermTagsFragment>;
