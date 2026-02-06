import type {
  MetaTag,
  MetaTagOverrides,
  MetaTagUnion,
} from "../shared/metatag-types";
import { applyOverrides } from "../shared/metatag-types";

export type { MetaTag };

type NextMetadata = {
  title?: string | null;
  description?: string | null;
  keywords?: string[];
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{ url: string }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: Array<{ url: string }>;
    site?: string;
    creator?: string;
  };
  alternates?: {
    canonical?: string;
  };
  other?: Record<string, string>;
};

const OG_FIELD_MAP: Record<string, string> = {
  "og:title": "title",
  "og:description": "description",
  "og:url": "url",
  "og:site_name": "siteName",
  "og:locale": "locale",
  "og:type": "type",
};

const TWITTER_FIELD_MAP: Record<string, string> = {
  "twitter:card": "card",
  "twitter:title": "title",
  "twitter:description": "description",
  "twitter:site": "site",
  "twitter:creator": "creator",
};

const TWITTER_NAMES = new Set([
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:site",
  "twitter:creator",
  "twitter:url",
]);

export const metaTags = ({
  tags,
  defaultTags = {},
  metaTagOverrides,
}: {
  tags: MetaTag[];
  defaultTags?: NextMetadata;
  metaTagOverrides?: MetaTagOverrides;
}): NextMetadata => {
  const metadata: NextMetadata = { ...defaultTags };

  for (const tag of tags as MetaTagUnion[]) {
    const overrideTag = metaTagOverrides?.[tag.__typename];

    if (tag.__typename === "MetaTagLink") {
      const { rel, href } = tag.attributes;
      const willOverrideTag = overrideTag?.[rel ?? ""];
      const resolvedHref = willOverrideTag
        ? applyOverrides(willOverrideTag, href)
        : href;

      if (rel === "canonical" && resolvedHref) {
        metadata.alternates = {
          ...metadata.alternates,
          canonical: resolvedHref,
        };
      }
    }

    if (tag.__typename === "MetaTagProperty") {
      const { property, content } = tag.attributes;
      const willOverrideTag = overrideTag?.[property ?? ""];
      const resolvedContent = willOverrideTag
        ? applyOverrides(willOverrideTag, content)
        : content;

      if (property && resolvedContent) {
        const ogField = OG_FIELD_MAP[property];
        if (ogField) {
          metadata.openGraph = {
            ...metadata.openGraph,
            [ogField]: resolvedContent,
          };
        } else if (property === "og:image") {
          metadata.openGraph = {
            ...metadata.openGraph,
            images: [{ url: resolvedContent }],
          };
        } else {
          metadata.other = {
            ...metadata.other,
            [property]: resolvedContent,
          };
        }
      }
    }

    if (tag.__typename === "MetaTagValue") {
      const { name, content } = tag.attributes;
      const willOverrideTag = overrideTag?.[name ?? ""];
      const resolvedContent = willOverrideTag
        ? applyOverrides(willOverrideTag, content)
        : content;

      if (name && resolvedContent) {
        if (name === "title") {
          metadata.title = resolvedContent;
        } else if (name === "description") {
          metadata.description = resolvedContent;
        } else if (name === "keywords") {
          metadata.keywords = resolvedContent.split(",").map((k) => k.trim());
        } else if (name === "robots") {
          metadata.robots = resolvedContent;
        } else if (TWITTER_NAMES.has(name)) {
          const twitterField = TWITTER_FIELD_MAP[name];
          if (twitterField) {
            metadata.twitter = {
              ...metadata.twitter,
              [twitterField]: resolvedContent,
            };
          } else if (name === "twitter:url") {
            metadata.other = {
              ...metadata.other,
              [name]: resolvedContent,
            };
          }
        } else if (name === "twitter:image") {
          metadata.twitter = {
            ...metadata.twitter,
            images: [{ url: resolvedContent }],
          };
        } else {
          metadata.other = {
            ...metadata.other,
            [name]: resolvedContent,
          };
        }
      }
    }
  }

  return metadata;
};
