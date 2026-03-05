import type { MetaTag } from "drupal-decoupled/react-router";

export const calculateMetaTags = (type: string, node: any): Array<MetaTag> => {
  if (type === "NodePage" || type === "NodeArticle") {
    const { metatag } = node;

    if (!metatag) return [];

    return metatag as MetaTag[];
  }

  return [];
};
