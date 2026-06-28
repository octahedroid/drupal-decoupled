import type { ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { MediaImageFragment } from "@/graphql/fragments/media";
import { graphql } from "@/graphql/gql.tada";
import { resolveMediaImage } from "@/integration/resolvers/helpers";

const ParagraphAuthorFragment = graphql(
  `
    fragment ParagraphAuthorFragment on ParagraphAuthor {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      name
      company
      position
    }
  `,
  [MediaImageFragment],
);

export const ParagraphTestimonialFragment = graphql(
  `
    fragment ParagraphTestimonialFragment on ParagraphTestimonial {
      __typename
      id
      quote
      author {
        __typename
        ...ParagraphAuthorFragment
      }
    }
  `,
  [ParagraphAuthorFragment],
);

type AuthorField = Extract<
  NonNullable<ResultOf<typeof ParagraphTestimonialFragment>["author"]>,
  { __typename: "ParagraphAuthor" }
>;

export const paragraphTestimonialResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphTestimonialFragment>;
}) => {
  const {
    id,
    quote,
    author: authorFragment,
  } = paragraph;
  const { name, position, company, image: imageFragment } = readFragment(
    ParagraphAuthorFragment,
    authorFragment as AuthorField,
  );
  return {
    id,
    quote,
    author: {
      name,
      position,
      company,
      avatar: { src: resolveMediaImage(imageFragment)?.src, name },
    },
  };
};
