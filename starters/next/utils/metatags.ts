import type { MetaTag } from "drupal-decoupled/next";
import type { NodeResultOf } from "@/graphql/types";

export const calculateMetaTags = (node: NodeResultOf): Array<MetaTag> => {
  if (node.__typename === "NodePage" || node.__typename === "NodeArticle") {
    return (node.metatag ?? []) as unknown as MetaTag[];
  }

  return [];
};
