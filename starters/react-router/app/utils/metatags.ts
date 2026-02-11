import type { MetaTag } from "drupal-decoupled/react-router";
import type { FragmentOf } from "gql.tada";
import { readFragment } from "gql.tada";
import {
  NodeArticleFragment,
  NodePageFragment,
} from "~/graphql/fragments/node";
import type { EntityFragmentType } from "~/graphql/types";

export const calculateMetaTags = (
  type: string,
  node: EntityFragmentType,
): Array<MetaTag> => {
  if (type === "NodePage") {
    const { metatag } = readFragment(
      NodePageFragment,
      node as FragmentOf<typeof NodePageFragment>,
    );

    return metatag as MetaTag[];
  }

  if (type === "NodeArticle") {
    const { metatag } = readFragment(
      NodeArticleFragment,
      node as FragmentOf<typeof NodeArticleFragment>,
    );

    return metatag as MetaTag[];
  }

  return [];
};
