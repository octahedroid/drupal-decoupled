import type { FragmentOf } from "gql.tada";
import { readFragment } from "gql.tada";

import { graphql } from "~/graphql/gql.tada";
import { CardGroup, Hero } from "~/components/blocks";
import {
  ViewBlogTeaserResultFragment,
  ViewBlogTeaserFeaturedResultFragment,
} from "~/graphql/fragments/view";
import { LinkFragment } from "~/graphql/fragments/misc";
import { NodeArticleTeaserFragment } from "~/graphql/fragments/node";
import { resolveMediaImage } from "~/integration/resolvers/helpers";

interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>;
}

type ReferenceFragment = (
  | FragmentOf<typeof ViewBlogTeaserResultFragment>
  | FragmentOf<typeof ViewBlogTeaserFeaturedResultFragment>
) & { __typename: string };

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

export const ParagraphViewReferenceResolver = ({
  paragraph,
}: ParagraphViewReferenceProps) => {
  const {
    id,
    headingOptional,
    descriptionOptional,
    subheadingOptional,
    link: linkFragment,
    reference: referenceFragment,
  } = readFragment(ParagraphViewReferenceFragment, paragraph);

  const action = linkFragment
    ? readFragment(LinkFragment, linkFragment)
    : undefined;
  const reference = calculateReference(referenceFragment);
  const { view, display, results } = reference
    ? reference
    : { view: undefined, display: undefined, results: undefined };
  const cards = results
    ? results.map((item) => {
        const type = "teaser";
        const { image, path, summary, title } = readFragment(
          NodeArticleTeaserFragment,
          item as FragmentOf<typeof NodeArticleTeaserFragment>,
        );
        const details = {
          href: path,
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
          image: resolveMediaImage(image),
        };
      })
    : [];

  if (view === "blog" && display === "teaser_featured") {
    const featured = cards[0];
    const remainingCards = cards.splice(1);

    return (
      <div id={id}>
        <Hero
          heading={featured.heading}
          image={featured.image}
          description={featured.summary}
          actions={[
            {
              href: featured.details.href || "",
              text: featured.details.text || "",
              internal: true,
            },
          ]}
        />
        {cards && (
          <CardGroup
            key={id}
            heading={headingOptional || ""}
            subheading={subheadingOptional || ""}
            description={descriptionOptional || ""}
            // @ts-expect-error - fix typings.
            cards={remainingCards}
            // @ts-expect-error - fix typings.
            action={action}
          />
        )}
      </div>
    );
  }

  if (view === "blog" && display === "teaser") {
    return (
      <CardGroup
        id={id}
        key={id}
        heading={headingOptional || ""}
        subheading={subheadingOptional || ""}
        description={descriptionOptional || ""}
        // @ts-expect-error - fix typings.
        cards={cards}
        // @ts-expect-error - fix typings.
        action={action}
      />
    );
  }
};
