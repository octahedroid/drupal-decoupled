type MetaTagUnion = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
  __isUnion?: true;
};

interface MetaTagLink {
  attributes: MetaTagLinkAttributes;
  __typename: "MetaTagLink";
}

type MetaTag = MetaTagLink | MetaTagValue | MetaTagProperty;

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

type OverrideOptionsSingle = {
  kind: string;
  pattern: string;
  replacement: string;
};

type OverrideOptions = string | OverrideOptionsSingle | OverrideOptionsSingle[];

type MetaTagOverrides = {
  [key in MetaTagUnion["__typename"]]?: {
    [key: string]: OverrideOptions;
  };
};

const applyOverrides = (
  overrides: OverrideOptions,
  initial: string | null | undefined,
) => {
  if (typeof overrides === "string") {
    return overrides;
  }

  if (!Array.isArray(overrides)) {
    overrides = [overrides];
  }

  return overrides.reduce(
    (acc, { pattern, replacement }) => acc?.replace(pattern, replacement),
    initial,
  );
};

export type {
  MetaTag,
  MetaTagLink,
  MetaTagValue,
  MetaTagProperty,
  MetaTagUnion,
  MetaTagOverrides,
  OverrideOptions,
  OverrideOptionsSingle,
};

export { applyOverrides };
