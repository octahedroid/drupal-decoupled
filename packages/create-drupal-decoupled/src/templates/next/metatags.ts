import { metaTags } from "drupal-decoupled/next";
import type { Metadata } from "next";

type MetaTag = {
  __typename: "MetaTagLink" | "MetaTagValue" | "MetaTagProperty";
  attributes: Record<string, string | null | undefined>;
};

export const calculateMetaTags = (type: string, node: any): Metadata => {
  if (type === "NodePage" || type === "NodeArticle") {
    const { metatag } = node;

    if (!metatag) return {};

    return metaTags({ tags: (metatag ?? []) as MetaTag[] });
  }

  return {};
};
