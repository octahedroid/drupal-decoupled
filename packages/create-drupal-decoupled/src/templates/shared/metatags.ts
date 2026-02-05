import type { MetaTag } from "drupal-decoupled/remix";

export const calculateMetaTags = (type: string, node: any): Array<MetaTag> => {
  if (type === "NodePage") {
    const { metatag } = node;

    return metatag as MetaTag[];
  }

  if (type === "NodeArticle") {
    const { metatag } = node;

    return metatag as MetaTag[];
  }

  return [];
};
