import type { ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { graphql } from "@/graphql/gql.tada";

const ParagraphQuestionFragment = graphql(`
  fragment ParagraphQuestionFragment on ParagraphQuestion {
    __typename
    id
    question
    answer {
      processed
    }
  }
`);

export const ParagraphFaqFragment = graphql(
  `
    fragment ParagraphFaqFragment on ParagraphFaq {
      __typename
      id
      heading
      descriptionOptional: description
      items {
        __typename
        ...ParagraphQuestionFragment
      }
    }
  `,
  [ParagraphQuestionFragment],
);

type QuestionItem = Extract<
  NonNullable<ResultOf<typeof ParagraphFaqFragment>["items"]>[number],
  { __typename: "ParagraphQuestion" }
>;

export const paragraphFaqResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphFaqFragment>;
}) => {
  const { id, heading, descriptionOptional, items } = paragraph;
  const questions = items.map((item) => {
    const { question, answer } = readFragment(
      ParagraphQuestionFragment,
      item as QuestionItem,
    );

    return {
      question,
      answer: String(answer.processed),
    };
  });

  return {
    id,
    heading,
    description: descriptionOptional || "",
    questions,
  };
};
