import type { MetaTagUnion, MetaTagValue } from "~/@types/gen/schema";

export const metaTags = ( tags: MetaTagUnion [] ) => {
  const title = tags.find(
    (tag: MetaTagUnion) =>
    tag.__typename === "MetaTagValue" && tag.attributes.name === "title"
  ) as MetaTagValue;

  const defaultTags = [
    { title: title.attributes.content },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },    
  ]

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

  return [ ...defaultTags, ...meta ];
};
