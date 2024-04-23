import { FragmentOf } from "gql.tada";
import { NodePageFragment, NodeArticleFragment } from "@/graphql/fragments/node";
import { TermTagsFragment } from "@/graphql/fragments/terms";

export type EntityFragmentType =
    FragmentOf<typeof NodePageFragment> |
    FragmentOf<typeof NodeArticleFragment> |
    FragmentOf<typeof TermTagsFragment>;