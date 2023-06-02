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

type OverrideKind = "replace" | "override";

type OverrideOptions = {
  kind: OverrideKind;
  pattern?: string;
  replacement: string;
};

type MetaTagOverrides = {
  [key in MetaTagUnion["__typename"]]?: {
    [key: string]: OverrideOptions;
  };
};

const DEFAULT_TAGS = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

export const metaTags = ({
  tags,
  defaultTags = [],
  metaTagOverrides,
}: {
  tags: MetaTag[];
  defaultTags?: Array<{ [key: string]: string | undefined }>;
  metaTagOverrides?: MetaTagOverrides;
}) => {
  const title = tags.find(
    (tag: MetaTagUnion) =>
      tag.__typename === "MetaTagValue" && tag.attributes.name === "title"
  ) as MetaTagValue;

  const meta = tags.map((tag: MetaTagUnion) => {
    const overrideTag = metaTagOverrides?.[tag.__typename];

    if (tag.__typename === "MetaTagLink") {
      const { rel, href } = tag.attributes;
      const willOverrideTag = overrideTag?.[rel!];
      if (!willOverrideTag) {
        return {
          tagName: "link",
          rel,
          href,
        };
      }

      const { kind, pattern, replacement } = willOverrideTag;

      const hrefOverride =
        kind === "override" ? replacement : href?.replace(pattern!, replacement);

      return {
        tagName: "link",
        rel,
        href: hrefOverride,
      };
    }
    if (tag.__typename === "MetaTagProperty") {
      const { property, content } = tag.attributes;
      const willOverrideTag = overrideTag?.[property!];
      if (!willOverrideTag) {
        return {
          property: tag.attributes.property,
          content: tag.attributes.content,
        };
      }

      const { kind, pattern, replacement } = willOverrideTag;

      const contentOverride =
        kind === "override"
          ? replacement
          : content?.replace(pattern!, replacement);

      return {
        property,
        content: contentOverride,
      };
    }
    if (tag.__typename === "MetaTagValue") {
      const { name, content } = tag.attributes;
      const willOverrideTag = overrideTag?.[name!];

      if (!willOverrideTag) {
        return {
          name: tag.attributes.name!,
          content: tag.attributes.content!,
        };
      }

      const { kind, pattern, replacement } = willOverrideTag;

      const contentOverride =
        kind === "override"
          ? replacement
          : content?.replace(pattern!, replacement);

      return {
        name,
        content: contentOverride,
      };
    }
  });

  return [
    ...DEFAULT_TAGS,
    ...defaultTags,
    title ? { title: title.attributes.content } : {},
    ...meta,
  ];
};
