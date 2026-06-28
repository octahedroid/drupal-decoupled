import type { ResultOf } from "gql.tada";
import { graphql } from "~/graphql/gql.tada";

export const ParagraphWebformFragment = graphql(`
  fragment ParagraphWebformFragment on ParagraphWebform {
    __typename
    id
    heading
    subheadingOptional: subheading
    descriptionOptional: description
    form {
      id
      __typename
    }
  }
`);

export const paragraphWebformResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphWebformFragment>;
}) => {
  const { id, heading, subheadingOptional, descriptionOptional, form } = paragraph;

  return {
    id,
    formId: form?.id ?? "",
    heading,
    subheading: subheadingOptional,
    description: descriptionOptional,
  };
};
