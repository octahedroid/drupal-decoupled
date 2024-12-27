import { FragmentOf, readFragment } from 'gql.tada'
import { FAQ } from '~/components/ui'
import {
  ParagraphFaqFragment,
  ParagraphQuestionFragment,
} from '~/graphql/drupal/fragments/paragraph'

import { Component, fieldText, fieldTextArea } from '~/components/resolvers/types'

const resolve = (paragraph: FragmentOf<typeof ParagraphFaqFragment>) => {
  const { id, heading, descriptionOptional: description, items } = readFragment(
    ParagraphFaqFragment,
    paragraph
  )

  return {
    id,
    heading,
    description,
    questions: items.map((item) => {
      const { question, answer } = readFragment(
        ParagraphQuestionFragment,
        item as FragmentOf<typeof ParagraphQuestionFragment>
      )

      return {
        question,
        answer: String(answer.processed),
      }
    }),
  }
}

export const ParagraphFaq: Component = {
  fields: {
    heading: fieldText,
    descriptionOptional: {
      ...fieldTextArea,
      ...{
        config: {
          fieldName: 'description',
        },
      }
    },
    items: {
      type: 'array',
      arrayFields: {
        question: fieldText,
        answer: fieldTextArea,
      },
    },
  },
  resolveData: async (data) => {
    const { questions } = resolve(
      data.props as FragmentOf<typeof ParagraphFaqFragment>
    )

    return {
      props: {
        items: questions,
      },
    }
  },
  render: (props) => {
    const { id, heading, description, questions } = resolve(props)

    return (
      <FAQ
        id={id}
        key={id}
        heading={heading}
        description={description}
        questions={questions}
      />
    )
  },
}
