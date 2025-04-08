import { Fragment } from 'react'

import { FragmentOf, readFragment } from 'gql.tada'
import { NodePageFragment } from '~/graphql/fragments/node'
import { resolveComponents } from '~/integration/resolvers/components'

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>
  environment: string
}

export default function NodePageComponent({ node }: NodePageComponentProps) {
  const { title, showTitle, components } = readFragment(NodePageFragment, node)

  // @ts-expect-error skip validation.
  const resolvedComponents = resolveComponents({ components })

  return (
    <>
      {showTitle && (
        <h1 className="container mx-auto text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          {title}
        </h1>
      )}
      {resolvedComponents.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>
      })}
    </>
  )
}
