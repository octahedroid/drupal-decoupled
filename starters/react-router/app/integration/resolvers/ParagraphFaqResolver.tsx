import type { FragmentOf } from 'gql.tada'
import { readFragment } from 'gql.tada'

import { FAQ } from '~/components/blocks'
import { graphql } from '~/graphql/gql.tada'

interface ParagraphFaqProps {
  paragraph: FragmentOf<typeof ParagraphFaqFragment>
}

const ParagraphQuestionFragment = graphql(`
  fragment ParagraphQuestionFragment on ParagraphQuestion {
    __typename
    id
    question
    answer {
      processed
    }
  }
`)

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
  [ParagraphQuestionFragment]
)

export const ParagraphFaqResolver = ({ paragraph }: ParagraphFaqProps) => {
  const { id, heading, descriptionOptional, items } = readFragment(
    ParagraphFaqFragment,
    paragraph
  )
  const questions = items.map((item) => {
    const { question, answer } = readFragment(
      ParagraphQuestionFragment,
      item as FragmentOf<typeof ParagraphQuestionFragment>
    )

    return {
      question,
      answer: String(answer.processed),
    }
  })

  return (
    <FAQ
      id={id}
      key={id}
      heading={heading}
      description={descriptionOptional || ''}
      questions={questions}
    />
  )
}
