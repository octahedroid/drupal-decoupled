import type { ResultOf } from "gql.tada";
import type {
  NodeArticleFragment,
  NodePageFragment,
} from "@/graphql/fragments/node";
import type { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";

export type NodePageResultOf = ResultOf<typeof NodePageFragment>;

export type NodeArticleResultOf = ResultOf<typeof NodeArticleFragment>;

export type NodeResultOf =
  | NodePageResultOf
  | NodeArticleResultOf;

export type ParagraphResultOf = ResultOf<typeof ParagraphUnionFragment>;
