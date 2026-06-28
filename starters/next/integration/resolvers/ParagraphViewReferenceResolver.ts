import type { FragmentOf, ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { LinkFragment } from "@/graphql/fragments/misc";
import { NodeArticleTeaserFragment } from "@/graphql/fragments/shared";
import {
  ViewBlogTeaserFeaturedResultFragment,
  ViewBlogTeaserResultFragment,
} from "@/graphql/fragments/view";
import { graphql } from "@/graphql/gql.tada";
import { resolveLink, resolveMediaImage } from "@/integration/resolvers/helpers";

type ReferenceFragment = NonNullable<
  ResultOf<typeof ParagraphViewReferenceFragment>["reference"]
>;

const calculateReference = (referenceFragment: ReferenceFragment) => {
  if (referenceFragment.__typename === "ViewBlogTeaserResult") {
    return readFragment(
      ViewBlogTeaserResultFragment,
      referenceFragment as FragmentOf<typeof ViewBlogTeaserResultFragment>,
    );
  }

  if (referenceFragment.__typename === "ViewBlogTeaserFeaturedResult") {
    return readFragment(
      ViewBlogTeaserFeaturedResultFragment,
      referenceFragment as FragmentOf<
        typeof ViewBlogTeaserFeaturedResultFragment
      >,
    );
  }
};

export const ParagraphViewReferenceFragment = graphql(
  `
    fragment ParagraphViewReference on ParagraphViewReference {
      __typename
      id
      headingOptional: heading
      subheadingOptional: subheading
      descriptionOptional: description
      link {
        ...LinkFragment
      }
      reference {
        __typename
        ...ViewBlogTeaserResultFragment
        ...ViewBlogTeaserFeaturedResultFragment
      }
    }
  `,
  [
    ViewBlogTeaserResultFragment,
    ViewBlogTeaserFeaturedResultFragment,
    LinkFragment,
  ],
);

export const paragraphViewReferenceResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphViewReferenceFragment>;
}) => {
  const {
    id,
    headingOptional,
    descriptionOptional,
    subheadingOptional,
    link: linkFragment,
    reference: referenceFragment,
  } = paragraph;

  const action = linkFragment
    ? resolveLink(linkFragment) ?? undefined
    : undefined;
  const reference = calculateReference(referenceFragment as ReferenceFragment);
  const view = (reference?.view ?? undefined) as string | undefined;
  const display = (reference?.display ?? undefined) as string | undefined;
  const results = reference?.results;
  const cards = results
    ? results.map((item) => {
      const type = "teaser";
      const { image, path, summary, title } = readFragment(
        NodeArticleTeaserFragment,
        item as FragmentOf<typeof NodeArticleTeaserFragment>,
      );
      const details = {
        href: path ?? "",
        text: "Read post",
        internal: true,
      };

      if (!image) {
        return { heading: title, summary, type, details };
      }

      return {
        heading: title,
        summary,
        type,
        details,
        image: resolveMediaImage(image) ?? undefined,
      };
    })
    : [];

  return {
    id,
    view,
    display,
    cards,
    headingOptional,
    subheadingOptional,
    descriptionOptional,
    action,
  };
};

export type ViewReferenceData = ReturnType<typeof paragraphViewReferenceResolver>;
