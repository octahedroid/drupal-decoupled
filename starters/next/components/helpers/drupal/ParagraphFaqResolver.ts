import { FragmentOf, readFragment } from 'gql.tada'
import {
  ParagraphFaqFragment,
  ParagraphQuestionFragment,
} from '@/graphql/drupal/fragments/paragraph'

interface ParagraphFaqProps {
  paragraph: FragmentOf<typeof ParagraphFaqFragment>
}

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

  return {
    id,
    heading,
    description: descriptionOptional,
    questions,
  }
}
