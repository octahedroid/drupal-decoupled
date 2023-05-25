type MetaTagUnion = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
  __isUnion?: true;
};

interface MetaTagLink {
  tag: string;
  attributes: MetaTagLinkAttributes;
  __typename: "MetaTagLink";
}

type MetaTag = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
  __isUnion?: true;
};

interface MetaTagLinkAttributes {
  rel?: string;
  href?: string;
  __typename: "MetaTagLinkAttributes";
}

interface MetaTagValue {
  tag: string;
  attributes: MetaTagValueAttributes;
  __typename: "MetaTagValue";
}

interface MetaTagValueAttributes {
  name?: string;
  content?: string;
  __typename: "MetaTagValueAttributes";
}

interface MetaTagProperty {
  tag: string;
  attributes: MetaTagPropertyAttributes;
  __typename: "MetaTagProperty";
}

interface MetaTagPropertyAttributes {
  property?: string;
  content?: string;
  __typename: "MetaTagPropertyAttributes";
}

export const metaTags = (tags: MetaTagUnion[]) => {
  const title = tags.find(
    (tag: MetaTagUnion) =>
      tag.__typename === "MetaTagValue" && tag.attributes.name === "title"
  ) as MetaTagValue;

  const defaultTags = [
    { title: title.attributes.content },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];

  const meta = tags.map((tag: MetaTagUnion) => {
    if (tag.__typename === "MetaTagLink") {
      return {
        tagName: "link",
        rel: tag.attributes.rel,
        href: tag.attributes.href,
      };
    }
    if (tag.__typename === "MetaTagProperty") {
      return {
        property: tag.attributes.property,
        content: tag.attributes.content,
      };
    }
    if (tag.__typename === "MetaTagValue") {
      return {
        name: tag.attributes.name!,
        content: tag.attributes.content!,
      };
    }
  });

  return [...defaultTags, ...meta];
};
