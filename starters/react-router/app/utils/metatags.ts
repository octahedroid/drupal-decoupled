import type { MetaTag } from "drupal-decoupled/react-router";
import type { NodeResultOf } from "~/graphql/types";

export const calculateMetaTags = (node: NodeResultOf): Array<MetaTag> => {
  if (node.__typename === "NodePage" || node.__typename === "NodeArticle") {
    // Cast bridges gql.tada's generated union and the library's MetaTag union;
    // the runtime shapes are structurally identical.
    return (node.metatag ?? []) as unknown as MetaTag[];
  }

  return [];
};
