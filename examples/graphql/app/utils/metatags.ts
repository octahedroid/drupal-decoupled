import { FragmentOf, readFragment } from "gql.tada";
import { type MetaTag } from "drupal-remix";
import { NodePageFragment, NodeArticleFragment } from "~/graphql/fragments/node";

type NodeFragmentType = FragmentOf<typeof NodePageFragment> | FragmentOf<typeof NodeArticleFragment>;

export const calculateMetaTags = (type: string, node: NodeFragmentType): Array<MetaTag> => {
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

