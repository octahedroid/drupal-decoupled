// Keep in sync with the types in Remix MetaTags
type MetaDescriptor =
  | {
      charSet: "utf-8";
    }
  | {
      title: string;
    }
  | {
      name: string;
      content: string;
    }
  | {
      property: string;
      content: string;
    }
  | {
      httpEquiv: string;
      content: string;
    }
  | {
      [name: string]: string;
      tagName: "meta" | "link";
    }
  | {
      [name: string]: unknown;
    };

type MetaTagUnion = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
  __isUnion?: true;
};

interface MetaTagLink {
  attributes: MetaTagLinkAttributes;
  __typename: "MetaTagLink";
}

export type MetaTag = MetaTagLink | MetaTagValue | MetaTagProperty;

interface MetaTagLinkAttributes {
  rel?: string | null;
  href?: string | null;
}

interface MetaTagValue {
  attributes: MetaTagValueAttributes;
  __typename: "MetaTagValue";
}

interface MetaTagValueAttributes {
  name?: string | null;
  content?: string | null;
}

interface MetaTagProperty {
  attributes: MetaTagPropertyAttributes;
  __typename: "MetaTagProperty";
}

interface MetaTagPropertyAttributes {
  property?: string | null;
  content?: string | null;
}

type OverrideOptionsReplace = {
  pattern: string;
  replacement: string;
}[];

type OverrideOptions = string | OverrideOptionsReplace;

type MetaTagOverrides = {
  [key in MetaTagUnion["__typename"]]?: {
    [key: string]: OverrideOptions;
  };
};

const DEFAULT_TAGS = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

const applyOverrides = (
  overrides: OverrideOptions,
  initial: string | null | undefined
) => {
  if (typeof overrides === "string") {
    return overrides;
  }

  return overrides.reduce(
    (acc, { pattern, replacement }) => acc?.replace(pattern, replacement),
    initial
  );
};

export const metaTags = ({
  tags,
  defaultTags = [],
  metaTagOverrides,
}: {
  tags: MetaTag[];
  defaultTags?: Array<{ [key: string]: string | undefined }>;
  metaTagOverrides?: MetaTagOverrides;
}): Array<MetaDescriptor> => {
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

      const hrefOverride = applyOverrides(willOverrideTag, href);

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

      const contentOverride = applyOverrides(willOverrideTag, content);

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

      const contentOverride = applyOverrides(willOverrideTag, content);

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
  ] as Array<MetaDescriptor>;
};
