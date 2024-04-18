import { FragmentOf, readFragment } from "gql.tada";
import { type MetaTag } from "drupal-remix";
import { NodePageFragment, NodeArticleFragment } from "~/graphql/fragments/node";
import { EntityFragmentType } from "./types";

export const calculateMetaTags = (type: string, node: EntityFragmentType): Array<MetaTag> => {
  if (type === "NodePage") {
    const { metatag } = readFragment(NodePageFragment, node as FragmentOf<typeof NodePageFragment>);
    return metatag;
  }

  if (type === "NodeArticle") {
    const { metatag } = readFragment(NodeArticleFragment, node as FragmentOf<typeof NodeArticleFragment>);
    return metatag;
  }

  return [];
};

